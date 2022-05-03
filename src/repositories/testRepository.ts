import { prisma } from "../database.js";
import { CreateTest } from "../services/testService.js"

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      discipline: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function findAllTests() {
  const infos = await prisma.test.findMany();

  return infos;
}

async function createTest(infos: CreateTest) {
  await prisma.test.create({
    data: infos
  })
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  findAllTests,
  createTest
};
