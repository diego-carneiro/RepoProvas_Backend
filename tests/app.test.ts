import app from "../src/app.js"
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";
import userInputFactory from "./factories/userInputFactory.js";

describe("User POST /register", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);
  
  it("Must return 201 and persist session given a valid body", async () => {
    const body = userInputFactory();

    const result = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
    expect(result.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("Must return 422 given an invalid body", async () => {
    const body = {}

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toEqual(422);
  });

  it("Must return 409 given a duplicate email", async () => {
    const body = userInputFactory();

    await supertest(app).post("/sign-up").send(body);
    const errorSource = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findMany({
      where: {
        email: body.email
      }
    });

    expect(errorSource.status).toEqual(409);
    expect(user.length).toEqual(1);

  });

});

// describe("POST /sign-up", () => {
//   it("Must return 201 and persist the user given the a valid body", async () => {
//     //Arrange
//     const user: CreateUserData = {
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     }

//     //Act 
//     const response = await supertest(app).post("/sign-up").send(user);

//     //Assert

//     expect(response.status).toEqual(201);

//   });
//   it.todo("Must return 422 given an invalid body");
//   it.todo("Must return 409 given an email already in use")
// })



async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE tests, "teacherDisciplines";`;
}

async function disconnect() {
  await prisma.$disconnect();
}