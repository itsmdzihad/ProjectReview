import app from "./app.js";
import config from "./App/config/index.js";

async function main() {
  app.listen(config.port, () => {
    console.log(`server  is running on http://localhost:${config.port}`);
  });
}

main().catch((e) => console.log(e));
