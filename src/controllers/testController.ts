import { Request, Response } from "express";
import testService, { CreateTest } from "../services/testService.js";

async function find(
  req: Request,
  res: Response
) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    console.log("erro aqui");

    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

async function createTest(
  req: Request, res: Response
) {
  const infos: CreateTest = req.body;

  await testService.createTest(infos);

  res.sendStatus(201);
}

export default {
  find,
  createTest
};
