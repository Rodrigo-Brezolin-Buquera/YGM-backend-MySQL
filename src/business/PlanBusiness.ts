import { PlanDatabase } from "../data/PlanDatabase";
import { CustomError } from "../error/customError";
import { FREQUENCY, Plan, planClassesDTO, planDataDTO, planEditDTO, planEditon, planFindByDTO, planFindDTO, planNewQuantity, planSearch, planSearchDTO, TYPE } from "../model/Plan";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { PlanVerifications } from "../verifications/PlanVerifications";


const planVerifications = new PlanVerifications()
const planDatabase = new PlanDatabase()
const authenticator = new Authenticator()
const genId = new IdGenerator()

export class PlanBusiness {

    public async findPlan({ token, status }: planFindDTO): Promise<Plan[]> {
        try {
            planVerifications.checkToken(token)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications.checkIfIsStudent(authentication.role)

            let statusValeu: boolean | undefined

            switch (status) {
                case "active":
                    statusValeu = true
                    break;
                case "inactive":
                    statusValeu = false
                    break;
                default:
                    statusValeu = undefined
                    break;
            }

            const search: planSearch = {
                userId: authentication.id,
                status: statusValeu
            }

            const result: Plan[] = await planDatabase.findPlan(search)

            return result
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findPlanByUserId({ token, id, status }: planFindByDTO): Promise<Plan[]> {
        try {
            planVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications.checkIfIsUser(authentication.role)

            let statusValeu: boolean | number

            switch (status) {
                case "active":
                    statusValeu = true
                    break;
                case "inactive":
                    statusValeu = false
                    break;
                default:
                    statusValeu = undefined
                    break;
            }
            
            const search: planSearch = {
                userId: id,
                status: statusValeu
            }
            console.log("business", search)
            const result: Plan[] = await planDatabase.findPlan(search)

            return result
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async createPlan({ type, frequency, planStarted, userId, token }: planDataDTO): Promise<void> {
        try {
            planVerifications
                .checkID(userId)
                .checkType(type)
                .checkFrequency(frequency)
                .checkDate(planStarted)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications.checkIfIsAdmin(authentication.role)

            let typeClasses: number = 1
            switch (type) {
                case TYPE.MONTHLY:
                    typeClasses = 4
                    break;
                case TYPE.QUARTERLY:
                    typeClasses = 8
                    break;
                case TYPE.SEMESTER:
                    typeClasses = 12
                    break;
                default:
                    break;
            }

            let totalClasses: number = 0
            switch (frequency) {
                case FREQUENCY.ONE:
                    totalClasses = typeClasses * 1
                    break;
                case FREQUENCY.TWO:
                    totalClasses = typeClasses * 2
                    break;
                case FREQUENCY.THREE:
                    totalClasses = typeClasses * 3
                    break;
                default:
                    break;
            }

            const timestamp = new Date(planStarted).getTime()
            const aWeekInMilliseconds: number = 604800000

            const planEndsTimeStamp: number = timestamp + aWeekInMilliseconds * typeClasses
            const planEnds = new Date(planEndsTimeStamp)

            const id = genId.generateId()

            const newPlan = new Plan(id, type, frequency, planStarted, planEnds, totalClasses, userId)

            await planDatabase.postPlan(newPlan)

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editPlan(input: planEditDTO): Promise<void> {
        try {
            const { type, frequency, planStarted, planEnds, totalClasses, avaliableClasses, planId, token } = input
            planVerifications
                .checkToken(token)
                .checkID(planId)
                .checkType(type)
                .checkFrequency(frequency)
                .checkDate(planStarted)
                .checkDate(planEnds)
                .checkDatesLogic(planStarted, planEnds)
                .checkClasses(totalClasses)
                .checkClasses(avaliableClasses)
                .checkClassesLogic(totalClasses, avaliableClasses)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications.checkIfIsAdmin(authentication.role)

            const changedPlan: planEditon = {
                planId,
                type,
                frequency,
                planStarted,
                planEnds,
                totalClasses,
                avaliableClasses
            }

            await planDatabase.editPlan(changedPlan)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }


    public async findPlanById({ token, id }: planSearchDTO): Promise<Plan> {
        try {
            planVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications
                .checkIfIsAdmin(authentication.role)

            const plan = await planDatabase.findPlanById(id)
            return plan

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }


    public async alterPlanStatus({ id, token }: planSearchDTO): Promise<void> {
        try {

            planVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)

            planVerifications.checkIfIsAdmin(authentication.role)

            await planDatabase.alterPlanStatus(id)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async changePlanClasses({ id, token, action }: planClassesDTO): Promise<void> {
        try {

            planVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            planVerifications.checkIfNotVisitor(authentication.role)

            const plan = await planDatabase.findPlanById(id)

            let newAvaliable = plan.avaliableClasses
            action === "remove" ? newAvaliable++ : newAvaliable--
            planVerifications.checkNegativeClass(newAvaliable)

            const planNewQuantity: planNewQuantity = {
                id,
                avaliableClasses: newAvaliable
            }

            await planDatabase.changePlanClasses(planNewQuantity)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deletePlan({ token, id }: planSearchDTO): Promise<void> {
        try {
            planVerifications
                .checkToken(token)
                .checkID(id)

            const authentication: AuthenticationData = authenticator.getData(token)
            planVerifications.checkIfIsAdmin(authentication.role)

            await planDatabase.deletePlan(id)

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
}