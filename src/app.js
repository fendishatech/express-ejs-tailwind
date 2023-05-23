require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
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
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("layout", "layouts/layout");
    this.app.use(expressLayouts);
    this.app.use(express.static("public")); // Serve static files first
    this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
    this.app.use(express.json()); // Parse JSON request bodies
    this.app.use(methodOverride("_method"));
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
