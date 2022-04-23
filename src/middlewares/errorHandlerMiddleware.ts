import { NextFunction, Request, Response } from "express";

const statusCode = {
    unauthorized: 401,
    conflict: 409,
    unprocessableEntity: 422,
    notFound: 404,
};

export default function errorHandlerMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type) {
        return res.status(statusCode[error.type]).send(error.message);
    }

    return res.status(500).send(error);
} 