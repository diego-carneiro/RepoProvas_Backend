import { Request, Response } from "express";

export async function signUp(
    req: Request,
    res: Response,
) {
    const { email, password } = res.locals.content;

}