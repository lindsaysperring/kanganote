const express = require("express");
const app = express();
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

app.use(express.json());

const cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes/index.route");

app.use(cors());

app.use("/api", routes);

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'COMP3120 Note Taking API',
      version: '1.0.0',
      description: 'This is an api that saves notes to a database and authenticates users'
    },
  },
  apis: ['./routes/*.route.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(
  "mongodb+srv://comp3120_group:xFywsSoJkHfUEuVQ@cluster0.gyscn.mongodb.net/comp3120_notes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
