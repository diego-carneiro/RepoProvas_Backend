import { prisma } from "../database.js";

export async function findAllTeacherDiscipline() {
  const teacherDiscipline = await prisma.teacherDiscipline.findMany({});

  return teacherDiscipline;
}

export async function findTeacherDisciplineById(id: number) {
  const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
    where: { id: id }
  });

  return teacherDiscipline;
}

