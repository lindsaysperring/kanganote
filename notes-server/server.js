const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");

const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

const cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes/index.route");

app.use(cors());

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
const users = new Map();

mongoose.connect(
  "mongodb+srv://comp3120_group:xFywsSoJkHfUEuVQ@cluster0.gyscn.mongodb.net/comp3120_notes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

io.on("connection", (socket) => {
  console.log("user connected");
  users.set(socket, {
    id: uuidv4(),
  });
  socket.emit("uuid", users.get(socket).id);
  socket.on("change", (message) => {
    socket.broadcast.emit("update", {
      clientId: users.get(socket).id,
      delta: message,
    });
    console.log(message);
  });
  socket.on("disconnect", () => {
    console.log(`${users.get(socket).id} disconnected`);
    users.delete(socket);
  });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../notes-client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
