import { CustomError, NotFoundError, UserNotFound } from "../error/customError";
import { User, user, userCode, userPasswordChange } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_NAME: string = "ygm_users"

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .insert(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        role: user.role
                    }
                )
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editUser(user: user): Promise<void> {
        try {
            const result = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .update({
                    name: user.name,
                    email: user.email
                })
                .where({ id: user.id })

            if (result === 0) {
                throw new UserNotFound
            }
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findUser(id: string): Promise<User> {
        try {
            const result = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .select("*")
                .where({ id })

            if (!result[0]) {
                throw new UserNotFound
            }
            return this.toModelUser(result[0])
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findUserByEmail(email: string): Promise<User> {
        try {
            const result = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .select("*")
                .where({ email })

            if (!result[0]) {
                throw new UserNotFound
            }
            return this.toModelUser(result[0])
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findAllStudents(): Promise<User[]> {
        try {
            const result = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .select("*")
                .where({ role: "student" })

            const users = result.map(user => this.toModelUser(user))

            return users
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deleteUser(id: string): Promise<void> {
        try {
            await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .delete("*")
                .where({ id })
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async createValidationCode({ id, validationCode }: userCode): Promise<void> {
        try {
            await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .update({
                    validation_code: validationCode
                })
                .where({ id })
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
    
    public async changePassword({ id, password }: userPasswordChange): Promise<void> {
        try {
            await BaseDatabase.connection(UserDatabase.TABLE_NAME)
                .update({ password })
                .where({ id })
              
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public toModelUser(obj: any): User {
        return new User(obj.id, obj.name, obj.email, obj.password, obj.role, obj.validation_code)
    }
}