import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchemaMiddleware(
    schema: ObjectSchema
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const content = req.body;
        const validation = schema.validate(content);

        if (validation.error) {
            throw { type: "Something went wrong.", message: validation.error}
        }

        res.locals.content = validation.value;

        next();
    }
}