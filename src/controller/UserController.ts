import { user, userDataDTO, userEditDTO, userIdOutput, userSearchDTO, userTokenDTO, token, userLoginDTO, userPasswordDTO } from "../model/User";
import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness";

const userBusiness = new UserBusiness()

export class UserController {

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const input: userLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }
            const token: token = await userBusiness.login(input)

            res.status(201).send({ data: token })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findUser(req: Request, res: Response): Promise<void> {
        try {
            const input: userTokenDTO = { token: req.headers.authorization! }
            const user: user = await userBusiness.findUser(input)
            res.status(201).send({ data: user })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findAllStudents(req: Request, res: Response): Promise<void> {
        try {
            const input: userTokenDTO = { token: req.headers.authorization! }
            const users: user[] = await userBusiness.findAllStudents(input)
            res.status(201).send({ data: users })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findUserById(req: Request, res: Response): Promise<void> {
        try {
            const input: userSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id
            }
            const user: user = await userBusiness.findUserByID(input)
            res.status(201).send({ data: user })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const input: userDataDTO = {
                token: req.headers.authorization!,
                name: req.body.name,
                email: req.body.email,
            }

            const { id }: userIdOutput = await userBusiness.createUser(input)

            res.status(201).send({
                message: "user created sucessfully",
                data: { id }
            })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editUser(req: Request, res: Response): Promise<void> {
        try {
            const input: userDataDTO = {
                token: req.headers.authorization!,
                name: req.body.name,
                email: req.body.email,
            }
            console.log(input)
            await userBusiness.editUser(input)
            res.status(201).send({ message: "user edited sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editUserByID(req: Request, res: Response): Promise<void> {
        try {
            const input: userEditDTO = {
                token: req.headers.authorization!,
                name: req.body.name,
                email: req.body.email,
                id: req.params.id!
            }

            await userBusiness.editUserByID(input)
            res.status(201).send({ message: "user edited sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const input: userSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id!
            }
            await userBusiness.deleteUser(input)
            res.status(201).send({ message: "user deleted sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async sendValidationCode(req: Request, res: Response): Promise<void> {
        try {
            const input: userTokenDTO = {
                token: req.headers.authorization!,
            }
            console.log(input)
            await userBusiness.sendValidationCode(input)
      
            res.status(201).send({ message: "validation code sent to email" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const input: userPasswordDTO = {
                token: req.headers.authorization!,
                validationCode: req.body.validationCode,
                password: req.body.password
            }
            await userBusiness.changePassword(input)

            res.status(201).send({ message: "password changed sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async sendNewPassword(req: Request, res: Response): Promise<void> {
        try {
            const input: userSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id
            }
            await userBusiness.sendNewPassword(input)

            res.status(201).send({ message: "password changed sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }



}