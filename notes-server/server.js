const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken')
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const server = http.createServer(app);
const { Server } = require("socket.io");
const notesService = require("./services/notes.service");
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
const config = require("./config");

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
  const token = socket.handshake.query.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.secret);
      if (decoded) {
        var userId = decoded.userId;
        console.log(userId)
      } else {
        return socket.disconnect();
      }
    } catch (err) {
      return socket.disconnect();
    }
  }

  users.set(socket, {
    id: userId,
  });
  
  socket.on("getNote", async (noteId) => {
    console.log(noteId);
    const note = await notesService.get(noteId, userId).catch((err) => ({
      error: err,
    }));
    if (note && !note.error) {
      socket.join(noteId);
      socket.emit("load-note", note.note);
    } else if (note && note.error) {
      socket.emit("error", { error: "Invalid noteId" });
    }
    socket.on("change", (message) => {
      socket.broadcast.to(noteId).emit("update", {
        clientId: users.get(socket).id,
        delta: message,
      });
      console.log(message);
    });
  });
  socket.emit("uuid", users.get(socket).id);

  socket.on("disconnect", () => {
    console.log(`${users.get(socket).id} disconnected`);
    users.delete(socket);
  });
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
