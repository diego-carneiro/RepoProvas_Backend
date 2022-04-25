import { prisma } from '../database.js';
import { User } from '@prisma/client';

type UserData = Omit<User, 'id'>;

export async function register(userData: UserData) {
  await prisma.user.create({ data: userData });
}