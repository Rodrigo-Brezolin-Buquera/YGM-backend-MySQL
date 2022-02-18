import { CustomError, PlanNotFound } from "../error/customError";
import { Plan, planEditon, planNewQuantity, planSearch } from "../model/Plan";
import { BaseDatabase } from "./BaseDatabase";


export class PlanDatabase extends BaseDatabase {

    public static TABLE_NAME = "ygm_plans"

    public async postPlan(plan: Plan): Promise<any> {
        try {
            await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                .insert(
                    {
                        id: plan.id,
                        type: plan.type,
                        frequency: plan.frequency,
                        plan_started: plan.planStarted,
                        plan_ends: plan.planEnds,
                        total_classes: plan.totalClasses,
                        avaliable_classes: plan.avaliableClasses,
                        status: plan.status,
                        user_id: plan.userId
                    }
                )
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editPlan(plan: planEditon): Promise<void> {
        const { planId, type, frequency, planStarted, planEnds, totalClasses, avaliableClasses } = plan
        await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
            .update(
                {
                    type,
                    frequency,
                    plan_started: planStarted,
                    plan_ends: planEnds,
                    total_classes: totalClasses,
                    avaliable_classes: avaliableClasses,
                }
            )
            .where({ id: planId })
    }


    public async findPlan({ userId, status }: planSearch): Promise<Plan[]> {
        try {
            let result
            if (status === undefined) {
                result = await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                    .select("*")
                    .where({ user_id: userId })
                  
            } else {
                result = await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                    .select("*")
                    .where({ user_id: userId })
                    .andWhere({ status })
            }
           console.log("databse", result)
            if (result.length === 0) {
                throw new PlanNotFound
            }

            const plans = result.map(plan => this.toModelPan(plan))

            return plans
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findPlanById(id: string): Promise<Plan> {
        try {
            const result = await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                .select("*")
                .where({ id })

            if (result.length === 0) {
                throw new PlanNotFound
            }

            const plan = this.toModelPan(result[0])

            return plan
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }


    public async changePlanClasses({ id, avaliableClasses }: planNewQuantity): Promise<void> {
        try {
            await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                .update({ avaliable_classes: avaliableClasses })
                .where({ id })

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async alterPlanStatus(id: string): Promise<void> {
        try {

            const result = await BaseDatabase.connection.raw(`
                UPDATE ${PlanDatabase.TABLE_NAME}
                SET status = NOT status
                WHERE id = "${id}";              
            `)

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deletePlan(id: string): Promise<void> {
        try {
            await BaseDatabase.connection(PlanDatabase.TABLE_NAME)
                .delete("*")
                .where({ id })

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public toModelPan(obj: any): Plan {
        const result = new Plan(obj.id, obj.type, obj.frequency, obj.plan_started, obj.plan_ends, obj.total_classes, obj.user_id, obj.avaliable_classes, obj.status)
        return result
    }
}