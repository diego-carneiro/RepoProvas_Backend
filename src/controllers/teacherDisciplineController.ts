import { Request, Response } from "express";
import * as teacherService from "../services/teacherServices.js"

async function getAllTD(req: Request, res: Response) {
    const Td = await teacherService.getAllTeacherDiscipline();
    
    res.send(Td);
}

export default {
    getAllTD,
};
