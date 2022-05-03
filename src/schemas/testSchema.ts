import Joi from "joi";
import { CreateTest } from "../services/testService";

const testSchema = Joi.object<CreateTest>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required().uri(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required(),
});

export default testSchema;