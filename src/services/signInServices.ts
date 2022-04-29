import { User } from '@prisma/client';
import  from "../middlewares/errorHandlerMiddleware.js"
import userRepository from "../repositories/userRepository"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

type CreateUserData = Omit<User, 'id'>;

export default async function login(user: CreateUserData) {
  const userCheck = await userRepository.findByEmail(user.email);
  if (!userCheck) throw returnError;

  const passwordCheck = bcrypt.compareSync(user.email, user.password);
  if (!passwordCheck) throw returnError;

  const token = jwt.sign(
    {
      userId: userCheck.id
    }, process.env.JWT_SECRET
  );

  return token;
}