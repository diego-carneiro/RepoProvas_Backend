import { prisma } from "../database.js";

async function findMany() {
  return prisma.category.findMany();
}

async function findCategoryById(id: number) {
  const category = await prisma.category.findUnique({
    where: { id: id }
  });

  return category;
}

export default {
  findMany,
  findCategoryById,
};
