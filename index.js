const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const Articale = require("./models/Articale.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://alilebbar94:mloolm123321@cluster0.3dfzznv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("not connected to MongoDB", error);
  });

// Define routes
app.get("/Articale", async (req, res) => {
  try {
    const articales = await Articale.find();
    res.json(articales);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/Articale", async (req, res) => {
  try {
    const newArticale = new Articale(req.body);
    await newArticale.save();
    io.emit("newArticale", newArticale); // Notify all clients about the new article
    res.status(201).json(newArticale);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
