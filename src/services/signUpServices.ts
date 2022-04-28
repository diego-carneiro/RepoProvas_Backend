import { User } from '@prisma/client';
import { returnError } from "../middlewares/errorHandlerMiddleware.js"
import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt";

type CreateUserData = Omit<User, 'id'>;

export default async function createUser(signUpInfo: CreateUserData) {
  const searchedUser = await userRepository.findByEmail(signUpInfo.email);

  if (searchedUser) throw returnError;

  const passwordHash = bcrypt.hashSync(signUpInfo.password, 10);

  userRepository.register({ ...signUpInfo, password: passwordHash });
}

