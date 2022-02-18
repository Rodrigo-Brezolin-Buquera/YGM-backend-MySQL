import express from "express";
import { ClassController } from "../ClassController";


export const classRouter = express.Router()

const classController = new ClassController()

classRouter.get("/", classController.findAllClasses)
classRouter.get("/:id", classController.findClassById )

classRouter.post("/", classController.createClass ) 

classRouter.put("/:groupId", classController.editClass ) 

classRouter.delete("/:groupId/:date", classController.deleteClass )