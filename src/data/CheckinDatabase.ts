import { CustomError } from "../error/customError";
import { checkin, Checkin } from "../model/Checkin";
import { BaseDatabase } from "./BaseDatabase";


export class CheckinDatabase extends BaseDatabase {

    public static TABLE_NAME: string = "ygm_checkins"

    public async createCheckin(checkin: Checkin): Promise<void> {
        try {
            await BaseDatabase.connection(CheckinDatabase.TABLE_NAME)
                .insert(
                    {
                        class_id: checkin.classId,
                        plan_id: checkin.planId,
                        verified: checkin.verified
                    }
                )
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findCheckinsByPlan(id: string): Promise<Checkin[]> {
        try {
            const result = await BaseDatabase.connection(CheckinDatabase.TABLE_NAME)
                .select("*")
                .where({ plan_id: id })
                
            const checkins = result.map((checkin) => this.toModelCheckin(checkin))   
            return checkins
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async findCheckinsByClass(id: string): Promise<Checkin[]> {
        try {
          
            const result = await BaseDatabase.connection(CheckinDatabase.TABLE_NAME)
                .select("*")
                .where({ class_id: id })
               
            const checkins = result.map((checkin) => this.toModelCheckin(checkin))
            return checkins
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async validateCheckin(checkin: Checkin): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
                UPDATE ${CheckinDatabase.TABLE_NAME}
                SET verified = NOT verified
                WHERE class_id = "${checkin.classId}"
                AND plan_id =  "${checkin.planId}" ;
            `)
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deleteCheckin({ classId, planId }: checkin): Promise<void> {
        try {
            await BaseDatabase.connection(CheckinDatabase.TABLE_NAME)
                .delete("*")
                .where({ class_id: classId })
                .andWhere({ plan_id: planId })
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public toModelCheckin(obj: any): Checkin {
        const result = new Checkin(obj.class_id, obj.plan_id, obj.verified)
        return result
    }
}