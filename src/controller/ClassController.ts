import { Request, Response } from "express"
import { ClassBusiness } from "../business/ClassBusiness"
import { classDataDTO, classDeleteDTO, classEditDTO, classSearchDTO, classTokenDTO, YogaClass } from "../model/YogaClass"


const classBusiness = new ClassBusiness()

export class ClassController {

    public async findAllClasses(req: Request, res: Response): Promise<void> {
        try {
            const input: classTokenDTO = { token: req.headers.authorization! }
            const yogaClasses: YogaClass[] = await classBusiness.findAllClasses(input)
            res.status(201).send({ data: yogaClasses })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findClassById(req: Request, res: Response): Promise<void> {
        try {
            const input: classSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id
            }

            const yogaClass: YogaClass = await classBusiness.findClassById(input)
            res.status(201).send({ data: yogaClass })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createClass(req: Request, res: Response): Promise<void> {
        try {
            const input: classDataDTO = {
                name: req.body.name,
                startingDate: req.body.startingDate,
                day: req.body.day,
                time: req.body.time,
                teacher: req.body.teacher,
                token: req.headers.authorization!
            }
            
            await classBusiness.createClass(input)
            res.status(201).send({ message: "class created sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editClass(req: Request, res: Response): Promise<void> {
        try {
            const input: classEditDTO = {
                name: req.body.name,
                startingDate: req.body.startingDate,
                day: req.body.day,
                time: req.body.time,
                teacher: req.body.teacher,
                groupId: req.params.groupId,
                token: req.headers.authorization!
            }

            await classBusiness.editClass(input)
            res.status(201).send({ message: "class edited sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteClass(req: Request, res: Response): Promise<void> {
        try {
            const input: classDeleteDTO = {
                token: req.headers.authorization! ,
                groupId: req.params.groupId,
                date: req.params.date
            }
          
            await classBusiness.deleteClass(input)
            res.status(201).send({ message: "class deleted sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}