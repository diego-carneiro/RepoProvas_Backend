import { Request, Response } from "express";
import { emailFinder } from "../repositories/userRepository";

export async function signUp(
    req: Request,
    res: Response,
) {
    const { email, password } = res.locals.content;
    await emailFinder(email);

    return res.sendStatus(201);
}