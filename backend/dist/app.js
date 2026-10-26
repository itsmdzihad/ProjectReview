import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./App/config/db.config.js";
import sendRes from "./App/utils/SendRes.js";
import router from "./App/routes/index.js";
import AppError from "./App/errors/AppError.js";
import globalErrorHandler from "./App/middleware/globalErrorHandler.js";
const app = express();
const connect = async () => {
    try {
        await prisma.$connect();
        console.log("Database is connected");
    }
    catch (e) {
        console.log("Database connecting Fail");
    }
};
connect();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);
app.get("/api/v1/health", (req, res, next) => {
    console.log("hi");
    throw new AppError(404, "not");
    sendRes({
        res,
        statusCode: 200,
        success: true,
        message: "The Server is Running",
        data: {},
    });
});
app.use(globalErrorHandler);
export default app;
