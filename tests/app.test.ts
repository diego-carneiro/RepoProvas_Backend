import app from "../src/app.js"
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";

import userInputFactory from "./factories/userInputFactory.js";
import signInFactory from "./factories/signInFactory.js"
import testsFactory from "./factories/testsFactory.js"

describe("User POST /sign-up", () => {
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

describe("User POST /sign-in", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Must return 200 and a token given valid information", async () => {
    const body = userInputFactory();
    await signInFactory(body);

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(200);
    expect(response.status).toEqual(200);
  });
  it.todo("Must return 422 given an invalid body");
  it.todo("Must return 409 given an email already in use")
})

// describe("Tests POST /test", () => {
//   beforeEach(truncateUsers);
//   beforeEach(truncateTests)
//   afterAll(disconnect);

//   it("Must return 201 given valid information", async () => {
//     const body = testsFactory();

//     const response = await supertest(app).post("/test").send(body).set(
//       "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY1MTU5Nzc5Mn0.-fWS9Zz9tjiODM1jf1j6hYLt4fM3u1E_QjCGND6iZR0"
//     );
    
//     const test = await prisma.test.findUnique({
//       where{

//       }
//     });

//     expect(response.status).toEqual(201);
//   });
// });


async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE tests, "TeacherDiscipline";`;
}

async function disconnect() {
  await prisma.$disconnect();
}