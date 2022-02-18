import { Request, Response } from "express"
import { CheckinBusiness } from "../business/CheckinBusiness"
import { checkinDataDTO, checkinIdDTO } from "../model/Checkin"

const checkinBussiness = new CheckinBusiness()

export class CheckinController {

    public async createCheckin(req: Request, res: Response): Promise<void> {
        try {
            const input: checkinDataDTO = {
                classId: req.params.classId,
                planId: req.params.planId,
                token: req.headers.authorization!
            }

            await checkinBussiness.createChekin(input)

            res.status(201).send({ message: "checkin done" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async validateCheckin(req: Request, res: Response): Promise<void> {
        try{
            const input: checkinDataDTO = {
                classId: req.params.classId,
                planId: req.params.planId,
                token: req.headers.authorization!
            }

            await checkinBussiness.validateCheckin(input)

            res.status(201).send({ message: "checkin validated" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findCheckinsByClass(req: Request, res: Response): Promise<void> {
        try{
            const input: checkinIdDTO = {
                id: req.params.id,
                token: req.headers.authorization!
            }
          
            const checkins = await checkinBussiness.findCheckinsByClass(input)

            res.status(201).send({ data: checkins  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    public async findCheckinsByPlan(req: Request, res: Response): Promise<void> {
        try{
            const input: checkinIdDTO = {
                id: req.params.id,
                token: req.headers.authorization!
            }

            const checkins = await checkinBussiness.findCheckinsByPlan(input)

            res.status(201).send({ data: checkins  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteCheckin(req: Request, res: Response): Promise<void> {
        try {
            const input: checkinDataDTO = {
                classId: req.params.classId,
                planId: req.params.planId,
                token: req.headers.authorization!
            }

            await checkinBussiness.deleteChekin(input)
            res.status(201).send({ message: "checkin deleted sucessfully" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}