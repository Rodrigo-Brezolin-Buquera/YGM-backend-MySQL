import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/customError";
import { token, User, user, userCode, userDataDTO, userEditDTO, userIdOutput, userLoginDTO, userPasswordChange, userPasswordDTO, userSearchDTO, userTokenDTO } from "../model/User";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManeger";
import { IdGenerator } from "../services/IdGenerator";
import { transporter } from "../services/MailTransporter";
import { UserVerifications } from "../verifications/UserVerifications";

const userDatabase = new UserDatabase()
const authenticator = new Authenticator()
const userVerifications = new UserVerifications()
const genId = new IdGenerator()
const hashManager = new HashManager()

export class UserBusiness {

    public async login({ email, password }: userLoginDTO): Promise<token> {
        try {

            userVerifications
                .checkEmail(email)
                .checkPassword(password)

            const user: User = await userDatabase.findUserByEmail(email)

            const comparePassword = await hashManager.verifyHash(password, user.password)
            userVerifications.checkHash(comparePassword)

            const payload: AuthenticationData = { id: user.id, role: user.role }
            const token: token = { token: authenticator.generateToken(payload) }

            return token
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findUser({ token }: userTokenDTO): Promise<user> {
        try {
            userVerifications.checkToken(token)
            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfIsUser(authentication.role)
            const result: User = await userDatabase.findUser(authentication.id)

            const user: user = {
                id: result.id,
                name: result.name,
                email: result.email
            }

            return user
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findAllStudents({ token }: userTokenDTO): Promise<user[]> {
        try {
            userVerifications.checkToken(token)

            const authentication: AuthenticationData = authenticator.getData(token)

            userVerifications.checkIfNotStudent(authentication.role)

            const result: User[] = await userDatabase.findAllStudents()

            const users: user[] = result.map(user => {
                return ({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            })
            return users
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findUserByID({ token, id }: userSearchDTO): Promise<user> {
        try {
            userVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfNotStudent(authentication.role)

            const result: User = await userDatabase.findUser(id)

            const user: user = {
                id: result.id,
                name: result.name,
                email: result.email
            }

            return user
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async createUser({ token, name, email }: userDataDTO): Promise<userIdOutput> {
        try {
            userVerifications.checkToken(token)

            const authentication: AuthenticationData = authenticator.getData(token)

            userVerifications
                .checkIfIsAdmin(authentication.role)
                .checkName(name)
                .checkEmail(email)

            const password = (Math.random() + 1).toString(36).substring(7);
            const id = genId.generateId()

            const hashPassword: string = await hashManager.generateHash(password)
            const user = new User(id, name, email, hashPassword)

            await userDatabase.createUser(user)

            await transporter.sendMail({
                from: `<${process.env.NODEMAILER_USER}>`,
                to: email,
                subject: "Sua senha de acesso",
                html: `<p>Sua senha de acesso é: ${password} </p>`,
                text: `Sua senha de acesso é: ${password} `
            })

            return { id }
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editUser({ token, name, email }: userDataDTO): Promise<void> {
        try {
            userVerifications.checkToken(token)

            const authentication: AuthenticationData = authenticator.getData(token)

            userVerifications
                .checkIfIsStudent(authentication.role)
                .checkName(name)
                .checkEmail(email)

            const user: user = {
                id: authentication.id,
                name,
                email
            }

            await userDatabase.editUser(user)

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editUserByID({ token, name, email, id }: userEditDTO): Promise<void> {
        try {
            userVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)

            userVerifications
                .checkIfIsAdmin(authentication.role)
                .checkName(name)
                .checkEmail(email)

            const user: user = { id, name, email }

            await userDatabase.editUser(user)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }


    public async deleteUser({ token, id }: userSearchDTO): Promise<void> {
        try {
            userVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfIsAdmin(authentication.role)

            await userDatabase.deleteUser(id)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async sendValidationCode({ token }: userTokenDTO): Promise<void> {
        try {
            userVerifications.checkToken(token)
            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfIsStudent(authentication.role)

            const user: User = await userDatabase.findUser(authentication.id)

            const validationCode = (Math.random() + 1).toString(36).substring(7);
            const hashCode: string = await hashManager.generateHash(validationCode)

            const userCode: userCode = {
                id: authentication.id,
                validationCode: hashCode
            }

            await userDatabase.createValidationCode(userCode)

            await transporter.sendMail({
                from: `<${process.env.NODEMAILER_USER}>`,
                to: user.email,
                subject: "Seu código de validação",
                html: `<p>Seu código de validação é: ${validationCode} </p>`,
                text: `Seu código de validação é: ${validationCode} `
            })
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async changePassword({ token, validationCode, password }: userPasswordDTO): Promise<void> {
        try {
            userVerifications
                .checkToken(token)
                .checkPassword(validationCode)
                .checkPassword(password)

            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfIsStudent(authentication.role)

            const user = await userDatabase.findUser(authentication.id)
            const hashCode = user.validationCode
            const hashCompare = await hashManager.verifyHash(validationCode, hashCode)
            userVerifications.checkValidationCode(hashCompare)

            const hashPassword: string = await hashManager.generateHash(password)

            const userPasswordChange: userPasswordChange = {
                id: authentication.id,
                password: hashPassword
            }

            await userDatabase.changePassword(userPasswordChange)

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async sendNewPassword({ token, id }: userSearchDTO): Promise<void> {
        try {
            userVerifications.checkToken(token)

            const authentication: AuthenticationData = authenticator.getData(token)
            userVerifications.checkIfIsAdmin(authentication.role)

            const user = await userDatabase.findUser(id)

            const password = (Math.random() + 1).toString(36).substring(7);
            const hashPassword: string = await hashManager.generateHash(password)

            const userPasswordChange: userPasswordChange = {
                id,
                password: hashPassword
            }

            await userDatabase.changePassword(userPasswordChange)

            await transporter.sendMail({
                from: `<${process.env.NODEMAILER_USER}>`,
                to: user.email,
                subject: "Sua senha de acesso",
                html: `<p>Sua senha de acesso é: ${password} </p>`,
                text: `Sua senha de acesso é: ${password} `
            })

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

}