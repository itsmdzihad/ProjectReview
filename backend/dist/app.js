import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
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
