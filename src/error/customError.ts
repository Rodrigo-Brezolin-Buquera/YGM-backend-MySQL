export class CustomError extends Error {
    constructor(
        message: any,
        public readonly statusCode: number = 400
    ) {
        super(message)
    }
}

export class NotFoundError extends CustomError {
    constructor() {
        super("Not Found", 404);
    }
}

export class UserNotFound extends CustomError {
    constructor() {
        super("User not found", 404);
    }
}

export class ClassNotFound extends CustomError {
    constructor() {
        super("Class not found", 404);
    }
}

export class PlanNotFound extends CustomError {
    constructor() {
        super("Plan not found", 404);
    }
}

export class InvalidRequest extends CustomError{
    constructor() {
        super("The request fields are Incorrect ", 400);
    }
}

export class AuthenticationMissing extends CustomError{
    constructor() {
        super("Token authentication necessary", 401);
    }
}

export class Unauthorized extends CustomError{
    constructor() {
        super("Unauthorized user", 401);
    }
}

export class Forbiden extends CustomError{
    constructor() {
        super("Forbiden action", 403);
    }
}

export class InvalidEmail extends CustomError{
    constructor() {
        super("Invalid email ", 406);
    }
}

export class InvalidDate extends CustomError{
    constructor() {
        super("Invalid dade, use the format: mm-dd-yyyy", 406);
    }
}

export class InvalidPassword extends CustomError{
    constructor() {
        super("Invalid password", 401);
    }
}

export class InvalidCode extends CustomError{
    constructor() {
        super("Invalid validation code", 401);
    }
}

export class EmptyObject extends CustomError{
    constructor() {
        super("An object have empty fields", 422);
    }
}

export class ShortName extends CustomError{
    constructor() {
        super("The name must have at least 3 character", 411);
    }
}

export class PasswordLength extends CustomError{
    constructor() {
        super("The password must have 5 to 10 characters", 411);
    }
}

export class TypeError extends CustomError{
    constructor() {
        super(`Type must be one of the following: "Mensal", "Trimestral", "Semestral", "Avulsa" ou "Gympass"`, 400);
    }
}

export class FrequencyError extends CustomError{
    constructor() {
        super(`Frequency must be one of the following: "1X", "2X", "3X" ou "---" `, 400);
    }
}

export class ClassesLogic extends CustomError{
    constructor() {
        super("Total classes must be bigger than the avaliable", 409);
    }Forbiden
}

export class DatesLogic extends CustomError{
    constructor() {
        super("The starting date must be before the ending date", 409)
        ;
    }
}

export class InvalidTime extends CustomError{
    constructor() {
        super("Time must be in the format: `hh:mm`", 400);
    }
}
export class InvalidDay extends CustomError{
    constructor() {
        super("Invalid day format", 400);
    }
}

export class InvalidTeacher extends CustomError{
    constructor() {
        super(`Teacher must be "Louize" or "Rodrigo"`, 400);
    }
}

export class NegativeClasses extends CustomError{
    constructor() {
        super(`Classes must be 0 or higher`, 403);
    }
}



