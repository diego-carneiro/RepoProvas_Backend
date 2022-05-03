import { prisma } from "../database.js";

async function findAllTeacherDiscipline() {
  const teacherDiscipline = await prisma.teacherDiscipline.findMany({});

  return teacherDiscipline;
}

async function findTeacherDisciplineById(id: number) {
  const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
    where: { id: id }
  });

  return teacherDiscipline;
}

export default {
  findAllTeacherDiscipline,
  findTeacherDisciplineById,
};
