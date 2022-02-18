export class User {
   constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly email: string,
      public readonly password: string,
      public readonly role: ROLES = ROLES.STUDENT,
      public readonly validationCode? : string
   ) { }
}

export enum ROLES {
   STUDENT = "student",
   TEACHER = "teacher",
   VISITOR = "visitor",
   ADMIN = "admin"
}

export interface user {
   id: string,
   name: string,
   email: string
}

export interface userTokenDTO {
   token: string
}

export interface userSearchDTO {
   token: string,
   id: string
}

export interface userDataDTO {
   token: string,
   name: string,
   email: string
}

export interface userEditDTO {
   token: string,
   name: string,
   email: string
   id: string
}

export interface userLoginDTO {
   email: string,
   password: string
}



export interface userIdOutput {
      id: string,
}

export interface token {
   token: string,
}

export interface userCode {
   id: string,
   validationCode: string
}

export interface userPasswordDTO {
   token: string,
   validationCode: string,
   password: string
}

export interface userPasswordChange {
   id: string,
   password: string
}