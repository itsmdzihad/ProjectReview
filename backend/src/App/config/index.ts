import dotEnv from "dotenv";

dotEnv.config();

const port = process.env.PORT;
const databaseUrl = process.env["DATABASE_URL"];
const nodeEnv = process.env.nodeEnv;
const secret = process.env.SECRET as string;
const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;

export default {
  port,
  databaseUrl,
  nodeEnv,
  secret,
  bcryptSaltRounds,
};
