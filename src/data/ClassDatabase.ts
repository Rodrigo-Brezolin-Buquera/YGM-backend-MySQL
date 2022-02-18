import { ClassNotFound, CustomError } from "../error/customError";
import { deleteClass, YogaClass } from "../model/YogaClass";
import { BaseDatabase } from "./BaseDatabase";


export class ClassDatabase extends BaseDatabase {

    public static TABLE_NAME: string = "ygm_classes"

    public async createClass(yogaClass: YogaClass): Promise<void> {
        try {
            await BaseDatabase.connection(ClassDatabase.TABLE_NAME)
                .insert(
                    {
                        id: yogaClass.id,
                        name: yogaClass.name,
                        date: yogaClass.date,
                        day: yogaClass.day,
                        time: yogaClass.time,
                        teacher: yogaClass.teacher,
                        group_id: yogaClass.groupId
                    }
                )
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editClass(yogaClass: YogaClass, groupId:string): Promise<void> {
        try {
            await BaseDatabase.connection(ClassDatabase.TABLE_NAME)
                .update({
                    day: yogaClass.day,
                    time: yogaClass.time,
                    teacher: yogaClass.teacher,
                    name: yogaClass.name,
                    date: yogaClass.date,
                    group_id: yogaClass.groupId
                })
                .where({ group_id: groupId })
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)

        }
    }

    public async getClass(id: string): Promise<YogaClass> {
        try {
            const result = await BaseDatabase.connection(ClassDatabase.TABLE_NAME)
                .select("*")
                .where({ id })

            if (result.length === 0) {
                throw new ClassNotFound
            }

            return this.toModelClass(result[0])
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async getAllClasses(): Promise<YogaClass[]> {
        try {
            const result = await BaseDatabase.connection(ClassDatabase.TABLE_NAME)
                .select("*")

            const yogaClasses = result.map(yogaClass => this.toModelClass(yogaClass))
            // vai dar ruim?
            return yogaClasses
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async deleteClass({groupId, date} : deleteClass): Promise<void> {
        try {
            await BaseDatabase.connection(ClassDatabase.TABLE_NAME)
                .delete("*")
                .where({ group_id: groupId })  
                .andWhereRaw(`date > ?`, [date])         
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public toModelClass(obj: any): YogaClass {
        const result = new YogaClass(obj.id, obj.name, obj.date, obj.day, obj.time, obj.teacher, obj.group_id)
        return result
    }
}