import { AuthenticationMissing, EmptyObject, InvalidRequest, Unauthorized } from "../error/customError"
import { ROLES } from "../model/User"

export class Verifications {

    public checkToken(token: string) {
        if (!token) {
            throw new AuthenticationMissing
        }
        return this
    }

    public checkID(id: string) {
        if (!id) {
            throw new InvalidRequest
        }
        return this
    }

    public checkIfIsUser(role: string) {
        if (role !== ROLES.ADMIN && role !== ROLES.TEACHER && role !== ROLES.VISITOR && role !== ROLES.STUDENT) {
            throw new Unauthorized
        }
        return this
    }

    public checkIfNotStudent(role: string) {
        if (role !== ROLES.ADMIN && role !== ROLES.TEACHER && role !== ROLES.VISITOR) {
            throw new Unauthorized
        }
        return this
    }

    public checkIfIsStudent(role: string) {
        if (role !== ROLES.STUDENT) {
            throw new Unauthorized
        }
        return this
    }

    public checkIfIsAdmin(role: string) {
        if (role !== ROLES.ADMIN) {
            throw new Unauthorized
        }
        return this
    }

    public checkIfNotVisitor(role: string) {
        if (role !== ROLES.ADMIN && role !== ROLES.TEACHER && role !== ROLES.STUDENT) {
            throw new Unauthorized
        }
        return this
    }

    public checkIfIsAdminOrTeacher(role: string) {
        if (role !== ROLES.ADMIN && role !== ROLES.TEACHER) {
            throw new Unauthorized
        }
        return this
    }

    public checkObject(obj: any) {
        const values = Object.values(obj);
        for (let value of values) {
            if (
                value === undefined ||
                value === null ||
                value === 0 ||
                value === "" ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === "object" && (Object.values(value!).length === 0 || this.checkObject(value)))
            ) {
                throw new EmptyObject
            }
        }
        return this
    }


}