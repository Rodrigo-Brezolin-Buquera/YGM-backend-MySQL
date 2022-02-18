import { CheckinDatabase } from "../data/CheckinDatabase";
import { CustomError } from "../error/customError";
import { checkin, Checkin, checkinDataDTO, checkinIdDTO } from "../model/Checkin";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { CheckinVerifications } from "../verifications/CheckinVerifications";

const checkinVerifications = new CheckinVerifications()
const authenticator = new Authenticator()
const checkinDatabase = new CheckinDatabase()

export class CheckinBusiness {

    public async createChekin({ classId, planId, token }: checkinDataDTO): Promise<void> {
        try {
            checkinVerifications
                .checkToken(token)
                .checkID(classId)
                .checkID(planId)

            const authentication: AuthenticationData = authenticator.getData(token)
            checkinVerifications.checkIfNotVisitor(authentication.role)

            const newCheckin = new Checkin(classId, planId)

            await checkinDatabase.createCheckin(newCheckin)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async validateCheckin({ classId, planId, token }: checkinDataDTO): Promise<void> {
        try {
            checkinVerifications
                .checkToken(token)
                .checkID(classId)
                .checkID(planId)

            const authentication: AuthenticationData = authenticator.getData(token)
            checkinVerifications.checkIfNotVisitor(authentication.role)

            const newCheckin = new Checkin(classId, planId)

            await checkinDatabase.validateCheckin(newCheckin)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findCheckinsByClass({ id, token }: checkinIdDTO): Promise<Checkin[]> {
        try {
            checkinVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            checkinVerifications.checkIfIsUser(authentication.role)

            const checkins = await checkinDatabase.findCheckinsByClass(id)

            return checkins
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findCheckinsByPlan({ id, token }: checkinIdDTO): Promise<Checkin[]> {
        try {
            checkinVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            checkinVerifications.checkIfIsUser(authentication.role)

            const checkins = await checkinDatabase.findCheckinsByPlan(id)
            return checkins
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deleteChekin({ classId, planId, token }: checkinDataDTO): Promise<void> {
        try {
            checkinVerifications
                .checkToken(token)
                .checkID(classId)
                .checkID(planId)

            const authentication: AuthenticationData = authenticator.getData(token)
            checkinVerifications.checkIfNotVisitor(authentication.role)

            const checkin: checkin = {classId, planId}

            await checkinDatabase.deleteCheckin(checkin)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
}