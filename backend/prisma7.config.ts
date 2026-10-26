import config from "./src/App/config/index";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: config.databaseUrl,
  },
});
