import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import login from "../services/signInServices";
import dotenv from "dotenv";

dotenv.config();

export async function ensurance(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authorization = req.headers['authorization'];
    if (!authorization) throw "erro"

    const token = authorization.replace("Bearer ", "");
    if (!token) throw "erro";

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: number
        };
        const user = await login.findById(userId);
        if (!user) throw "unauthorized"

        next();

    } catch (error) {



    }
}