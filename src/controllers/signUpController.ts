import { Request, Response } from "express";
 
import signUpServices from "../services/signUpServices";

export async function signUp(
    req: Request,
    res: Response,
) {
    const user = req.body;  

    await signUpServices.createUser(user);

    return res.sendStatus(201);  
}

export async function signIn(
    req: Request,
    res: Response,
) {
    const user = req.body;  

    res.sendStatus(200);
}