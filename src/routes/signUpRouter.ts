import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js"
import { userSchema } from "../schemas/signUpSchema.js"
import * as userController from "../controllers/signUpController.js"

const userRouter = Router();

userRouter.post("sign-up", validateSchemaMiddleware(userSchema), userController.signUp);


export default userRouter;