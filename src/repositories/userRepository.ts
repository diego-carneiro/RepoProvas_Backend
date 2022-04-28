import { prisma } from '../database.js';
import { User } from '@prisma/client'; 

type UserData = Omit<User, 'id'>;

async function register(userData: UserData) {
  await prisma.user.create({ 
    data: userData,
  });
}

async function findByEmail(email: string){
  return prisma.user.findUnique({
    where: {
      email,
    }
  })
}

export default { 
  register,
  findByEmail,
}