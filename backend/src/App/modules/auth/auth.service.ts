import httpStatus from "http-status";
import { prisma } from "../../config/db.config.js";
import config from "../../config/index.js";
import bcrypt from "bcryptjs";
import AppError from "../../errors/AppError.js";

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashPass = await bcrypt.hash(
    payload.password,
    Number(config.bcryptSaltRounds),
  );
  const data = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      passwordHash: hashPass,
    },
  });

  const { passwordHash, ...withOurPass } = data;

  return withOurPass;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const findUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!findUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please Register to login");
  }

  const matchPass = await bcrypt.compare(
    payload.password,
    findUser?.passwordHash as string,
  );

  if (!matchPass) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong Email or Password");
  }
  const { passwordHash, ...withOurPass } = findUser;

  return withOurPass;
};

export const authService = {
  registerUser,
  loginUser,
};
