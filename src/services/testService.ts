import testRepository from "../repositories/testRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";
import * as teacherRepository from "../repositories/teacherDisciplineRepository.js";
import { Test } from "@prisma/client";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

export type CreateTest = Omit<Omit<Test, "id">, "views">;

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function createTest(infos: CreateTest) {
  const categoriesInfos = await categoryRepository.findCategoryById(infos.categoryId);

  if (!categoriesInfos) throw { type: "conflict" }

  const teacherDisciplineInfos = await teacherRepository.findTeacherDisciplineById(infos.teacherDisciplineId);

  if (!teacherDisciplineInfos) throw { type: "conflict" }

  await testRepository.createTest(infos);
}

export default {
  find,
  createTest
};
