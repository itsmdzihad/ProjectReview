import app from "./app.js";
import config from "./App/config/index.js";
import { prisma } from "./App/config/db.config.js";
import seedDemoMentor from "./App/config/seed.js";
async function main() {
    try {
        await prisma.$connect();
        console.log("Database is connected");
        await seedDemoMentor();
        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    }
    catch (error) {
        console.error("Application startup failed:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
