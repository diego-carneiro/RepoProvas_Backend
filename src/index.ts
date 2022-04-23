import cors from "cors"
import express, { json } from "express";
import "express-async-errors";
// import { errorHandler } from "express";

const server = express();
server.use(json());
server.use(cors());
// server.use(routeer)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
    
});