import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./App/config/db.config.js";
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
app.get("/", (req, res, next) => {
    res.json({
        status: 200,
        message: "All okay",
    });
});
export default app;
