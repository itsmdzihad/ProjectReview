import bcrypt from "bcryptjs";
import { prisma } from "./db.config.js";
import config from "./index.js";
import { Role } from "../../generated/prisma/enums.js";

const seedDemoMentor = async () => {
  const email = "mentor@codepath.dev";

  const existingMentor = await prisma.user.findUnique({
    where: { email },
  });

  if (existingMentor) {
    console.log("Demo mentor already exists. Skipping seed.");
    return;
  }

  const passwordHash = await bcrypt.hash(
    "Mentor@12345",
    Number(config.bcryptSaltRounds),
  );

  await prisma.user.create({
    data: {
      name: "Demo Mentor",
      email,
      passwordHash,
      role: Role.MENTOR,
    },
  });

  console.log("Demo mentor seeded successfully.");
};

export default seedDemoMentor;
