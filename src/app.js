const express = require("express");
const authRouter = require("./routes/auth.router");

class ExpressApp {
  constructor(port) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.set("view engine", "ejs");
    this.app.use(express.static("public"));
  }

  setupRoutes() {
    this.app.use("", authRouter);
  }

  startServer(port) {
    this.app.listen(port, () => {
      console.log("Server is up ...");
    });
  }
}

module.exports = ExpressApp;
