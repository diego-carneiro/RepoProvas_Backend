import { Router } from "express";
import teacherDisciplineController from "../controllers/teacherDisciplineController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";


const teacherDisciplineRouter = Router();

teacherDisciplineRouter.get("/teacherDiscipline",
    ensureAuthenticatedMiddleware,
    teacherDisciplineController.getAllTD);


export default teacherDisciplineRouter;
