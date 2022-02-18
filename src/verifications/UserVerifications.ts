import {InvalidCode, InvalidEmail, InvalidPassword, InvalidRequest, PasswordLength, ShortName } from "../error/customError"
import { Verifications } from "./Verifications"

export class UserVerifications extends Verifications {

    public checkName(name: string) {
        if (!name) {
            throw new InvalidRequest
        }
        if (name.length < 3) {
            throw new ShortName
        }
        return this
    }

    public checkEmail(email: string) {
        if (!email) {
            throw new InvalidRequest
        }

        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        // regex não está funcionando

        // if (!regex.test(email)) {    
        //    throw new InvalidEmail
        // }
        return this
    }

    public checkPassword(password: string) {
        if (!password) {
            throw new InvalidRequest
        }
        if (password.length < 4 || password.length > 10) {
            throw new PasswordLength
        }
        return this
    }

    public checkHash(hash: boolean) {
        if (!hash) {
            throw new InvalidPassword
        }
        return this
    }

    public checkValidationCode(hash: boolean) {
        if (!hash) {
            throw new InvalidCode
        }
        return this
    }



}

