import { ClassesLogic, DatesLogic, FrequencyError, InvalidRequest, NegativeClasses, ShortName, TypeError } from "../error/customError"
import { FREQUENCY, TYPE } from "../model/Plan"
import { Verifications } from "./Verifications"

export class PlanVerifications extends Verifications {

    public checkName(name: string) {
        if (!name) {
            throw new InvalidRequest
        }
        if (name.length < 3) {
            throw new ShortName
        }
        return this
    }

    public checkType(type: string) {
        if (!type) {
            throw new InvalidRequest
        }
        if (
            type !== TYPE.MONTHLY
            && type !== TYPE.QUARTERLY
            && type !== TYPE.SEMESTER
            && type !== TYPE.SINGLE
            && type !== TYPE.APP
        ) {
            throw new TypeError
        }
        return this
    }

    public checkFrequency(frequency: string) {
        if (!frequency) {
            throw new InvalidRequest
        }
        if (
            frequency !== FREQUENCY.ONE
            && frequency !== FREQUENCY.TWO
            && frequency !== FREQUENCY.THREE
            && frequency !== FREQUENCY.NONE
        ) {
            throw new FrequencyError
        }
        return this
    }

    public checkDate(date: Date) {
        if (!date) {
            throw new InvalidRequest
        }
        // outras verificações de data?
        return this
    }

    public checkClasses(classes: number) {
        if (isNaN(classes)) {
            throw new InvalidRequest
        }
        if (classes < 0) {
            throw new NegativeClasses
        }
        return this
    }

    public checkNegativeClass(classes: number) {
        
        if (classes < 0) {
            throw new NegativeClasses
        }
        return this
    }

    public checkStatus(status: boolean) {
        if (typeof status !== "boolean") {
            throw new InvalidRequest
        }
        return this
    }

    public checkClassesLogic(total: number, avaliable: number) {
        if (avaliable > total) {
            throw new ClassesLogic
        }
        return this
    }

    public checkDatesLogic(start: Date, end: Date) {
        if (start > end) {
            throw new DatesLogic
        }

        // outras verificações de data?

        return this
    }

}

