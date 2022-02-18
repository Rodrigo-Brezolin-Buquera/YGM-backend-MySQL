import express from "express";
import { PlanController } from "../PlanController";

export const planRouter = express.Router()
const planController = new PlanController()

planRouter.get("/list", planController.findPlan )  // query status=inactive  - planos inativos - ativos como padrão
planRouter.get("/planId/:id", planController.findPlanById)
planRouter.get("/:id", planController.findPlanByUserId )  //dando algum erro

planRouter.post("/", planController.createPlan )

planRouter.put("/status/:id", planController.alterPlanStatus )
planRouter.put("/classes/:id", planController.changePlanClasses ) // por padroão adiciona, query action=remove - subtrai
planRouter.put("/:id", planController.editPlan )

planRouter.delete("/:id", planController.deletePlan )
