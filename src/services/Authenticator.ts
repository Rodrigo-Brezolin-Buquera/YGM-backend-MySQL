
import * as jwt from "jsonwebtoken";


export interface AuthenticationData {
    id: string;
    role: string;
  } 

export class Authenticator {

    generateToken(input:AuthenticationData  ): string {
       
        const token = jwt.sign(
           input,
            process.env.JWT_KEY!,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        )
        return token
    }

    getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, process.env.JWT_KEY!) as any
        const result: AuthenticationData = { id: payload.id, role: payload.role }
        return result
    }
}