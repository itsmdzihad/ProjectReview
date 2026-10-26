import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./App/config/db.config.js";
import sendRes from "./App/utils/SendRes.js";
import router from "./App/routes/index.js";

const app: Application = express();

const connect = async () => {
  try {
    await prisma.$connect();
    console.log("Database is connected");
  } catch (e) {
    console.log("Database connecting Fail");
  }
};

connect();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/api/v1/health", (req: Request, res: Response, next: NextFunction) => {
  console.log("hi");
  sendRes({
    res,
    statusCode: 200,
    success: true,
    message: "The Server is Running",
    data: {},
  });
});

export default app;
