import cors from "cors"
import express, { json } from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js"

const server = express();
server.use(json());
server.use(cors());
server.use(router);
server.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
    
});