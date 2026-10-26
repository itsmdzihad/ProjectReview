import dotEnv from "dotenv";

dotEnv.config();

const port = process.env.PORT;
const databaseUrl = process.env["DATABASE_URL"];
export default {
  port,
  databaseUrl,
};
