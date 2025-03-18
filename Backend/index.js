import express from "express";
import MainRouter from "./routes/index.js";
import UserRouter from "./routes/user.js";

const app = express();

app.use("/api/v1", MainRouter);


const PORT = 3000;
