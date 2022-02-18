import express from "express";
import { CheckinController } from "../CheckinController";

export const checkinRouter = express.Router()

const checkinController = new CheckinController()

checkinRouter.get("/class/:id", checkinController.findCheckinsByClass)
checkinRouter.get("/plan/:id", checkinController.findCheckinsByPlan)

checkinRouter.post("/:classId/:planId", checkinController.createCheckin  )

checkinRouter.put("/:classId/:planId", checkinController.validateCheckin )

checkinRouter.delete("/:classId/:planId", checkinController.deleteCheckin  )


