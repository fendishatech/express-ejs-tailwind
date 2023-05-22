require("dotenv").config();
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const blogRouter = require("./routes/blog.router");

class ExpressApp {
  constructor(port) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.set("view engine", "ejs");
    this.app.use(methodOverride("_method"));
    this.app.set(expressLayouts);
    this.app.use(express.static("public"));
    this.app.set("views", path.join(__dirname, "views"));
  }

  setupRoutes() {
    this.app.use("/", blogRouter);
  }

  startServer(port) {
    this.app.listen(port, () => {
      console.log("Server is up ...");
    });
  }
}

module.exports = ExpressApp;
