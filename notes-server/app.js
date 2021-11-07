const express = require("express");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());

const cors = require("cors");

const routes = require("./routes/index.route");
const path = require("path");

app.use(cors());

app.use(express.static(path.join(__dirname, "../notes-client/build")));

app.use("/api", routes);

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "COMP3120 Note Taking API",
      version: "1.0.0",
      description:
        "This is an api that saves notes to a database and authenticates users",
    },
  },
  apis: ["./routes/*.route.js"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../notes-client/build/index.html"));
});

module.exports = app;