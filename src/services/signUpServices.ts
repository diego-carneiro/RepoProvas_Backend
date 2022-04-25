import { prisma } from '../database.js';
import { User } from '@prisma/client';
import { returnError } from "../middlewares/errorHandlerMiddleware.js"
import * as userRepository from "../repositories/userRepository"
import bcrypt from 'bcrypt';

type SignUp = Omit<User, 'id'>;

export async function create(signUpInfo: SignUp) {
  const searchedUser = await prisma.user.findFirst({
    where: {
      email: signUpInfo.email
    }
  });

  if (searchedUser) {
    throw returnError;
  }

  const passwordHash = bcrypt.hashSync(signUpInfo.password, 10);
  const userData = { ...signUpInfo, password: passwordHash };

  userRepository.register(userData);
}