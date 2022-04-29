import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import login from "../services/signInServices";
import { unauthorizedError } from "../utils/errorUtils.js"
import dotenv from "dotenv";

dotenv.config();

export async function ensurance(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authorization = req.headers['authorization'];
    if (!authorization) throw unauthorizedError("Missing authorization header");

    const token = authorization.replace("Bearer ", "");
    if (!token) throw unauthorizedError("Missing token");

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: number;
        };
        const user = await login.findById(userId);
        if (!user) throw "unauthorized"

        next();

    } catch (error) {
        throw unauthorizedError("InvalidToken");

    }
}