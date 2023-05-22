const ExpressApp = require("./src/app");
// --- Dev ---
// const migrate_tables = require("./src/helpers/migrate_models");
// migrate_tables();
// --- Dev ---
const app = new ExpressApp();
app.startServer(3333);
