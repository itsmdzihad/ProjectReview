import dotEnv from "dotenv";
dotEnv.config();
const port = process.env.PORT;
const databaseUrl = process.env["DATABASE_URL"];
const nodeEnv = process.env.nodeEnv;
export default {
    port,
    databaseUrl,
    nodeEnv,
};
