import { InvalidDate, InvalidDay, InvalidRequest, InvalidTeacher, InvalidTime, ShortName } from "../error/customError";
import { DAY, TEACHER } from "../model/YogaClass";
import { Verifications } from "./Verifications";

export class ClassVerifications extends Verifications {

    public checkName(name: string) {
        if (!name) {
            throw new InvalidRequest
        }
        if (name.length < 3) {
            throw new ShortName
        }
        return this
    }

    public checkDate(date: string) {
        if (!date) {
            throw new InvalidRequest
        }


        if (date.indexOf("-") === -1 || date.length !== 10) {
            throw new InvalidDate
        }

        // outras verificações de data?

        return this
    }

    public checkTime(time: string) {
        if (!time) {
            throw new InvalidRequest
        }
        if (time.indexOf(":") === -1 || time.length !== 5) {
            throw new InvalidTime
        }
        return this
    }

    public checkDay(day: string) {
        if (!day) {
            throw new InvalidRequest
        }
        if (
            day !== DAY.MON
            && day !== DAY.TUE
            && day !== DAY.WED
            && day !== DAY.THU
            && day !== DAY.FRI
            && day !== DAY.SAT
        ) {
            throw new InvalidDay
        }
        return this
    }

    public checkTeacher(teacher: string) {
        if (!teacher) {
            throw new InvalidRequest
        }
        if (teacher !== TEACHER.LOUIZE && teacher !== TEACHER.RODRIGO) {
            throw new InvalidTeacher
        }
        return this
    }



}