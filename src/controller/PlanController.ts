import { Request, Response } from "express";
import { PlanBusiness } from "../business/PlanBusiness";
import { Plan, planClassesDTO, planDataDTO, planEditDTO, planFindByDTO, planFindDTO, planSearchDTO } from "../model/Plan";


const planBusiness = new PlanBusiness()

export class PlanController {

    public async findPlan(req: Request, res: Response): Promise<void> {
        try {
            const input: planFindDTO = {
                token: req.headers.authorization!,
                status: req.query.status as string
            }
      
            const plan: Plan[] = await planBusiness.findPlan(input)
            res.status(201).send({ data: plan })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findPlanByUserId(req: Request, res: Response): Promise<void> {
        try {
            const input: planFindByDTO = {
                token: req.headers.authorization!,
                id: req.params.id,
                status: req.query.status as string
            }
         
            console.log("controller", input)
            const plans: Plan[] = await planBusiness.findPlanByUserId(input)
            res.status(201).send({ data: plans })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createPlan(req: Request, res: Response): Promise<void> {
        try {
            const input: planDataDTO = {
                type: req.body.type,
                frequency: req.body.frequency,
                planStarted: req.body.planStarted,
                userId: req.body.userId,
                token: req.headers.authorization!
            }

            await planBusiness.createPlan(input)

            res.status(201).send({ message: "plan created sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async alterPlanStatus(req: Request, res: Response): Promise<void> {
        try {
            const input: planSearchDTO = {
                id: req.params.id,
                token: req.headers.authorization!
            }

            await planBusiness.alterPlanStatus(input)

            res.status(201).send({ message: "plan status altered" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async changePlanClasses(req: Request, res: Response): Promise<void> {
        try {
            const input: planClassesDTO = {
                id: req.params.id,
                token: req.headers.authorization!,
                action: req.query.action as string
            }

            await planBusiness.changePlanClasses(input)

            res.status(201).send({ message: "classes changed" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editPlan(req: Request, res: Response): Promise<void> {
        try {
            const input: planEditDTO = {
                type: req.body.type,
                frequency: req.body.frequency,
                planStarted: req.body.planStarted,
                planEnds: req.body.planEnds,
                totalClasses: req.body.totalClasses,
                avaliableClasses: req.body.avaliableClasses,
                planId: req.params.id,
                token: req.headers.authorization!
            }

            await planBusiness.editPlan(input)

            res.status(201).send({ message: "plan edited sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findPlanById(req: Request, res: Response): Promise<void> {
        try {
            const input: planSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id!
            }
            
            const plan = await planBusiness.findPlanById(input)
    
            res.status(201).send({ data: { plan } })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deletePlan(req: Request, res: Response): Promise<void> {
        try {
            const input: planSearchDTO = {
                token: req.headers.authorization!,
                id: req.params.id
            }

            await planBusiness.deletePlan(input)
            res.status(201).send({ message: "plan deleted sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}