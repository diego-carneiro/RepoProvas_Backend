import { Router } from "express";
import userRouter from "./signUpRouter";

const router = Router();
router.use(userRouter);

export default router;
