import app from "./app.js";
import config from "./App/config/index.js";
app.listen(config.port, () => {
    console.log("server is running");
});
