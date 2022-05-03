import { faker } from "@faker-js/faker"
import { CreateTest } from "../../src/services/testService";

export default function testsFactory(): CreateTest {
  return {
    name: faker.name.findName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherDisciplineId: 1,
  }
}
