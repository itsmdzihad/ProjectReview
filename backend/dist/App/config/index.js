import dotEnv from "dotenv";
dotEnv.config();
const port = process.env.PORT;
export default {
    port,
};
