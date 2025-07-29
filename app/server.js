const express = require("express");
const app = express();
const dbconfig = require("./src/db_connect/db_connect");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const orderRoutes = require("./src/routes/orderRoute");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const Chat = require("./src/Models/chatModel"); // adjust path
const Chatroutes = require("./src/routes/chatRoutes");

const users = new Map();
// Initialize database connection
dbconfig();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", orderRoutes);
app.use("/api", Chatroutes);

const port = 8081;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
const connectedUsers = new Map(); // userId → socket.id

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message, role }) => {
    if (role === "admin") {
      // Check if user has sent message to admin before
      const existingMessage = await Message.findOne({
        senderId: receiverId, // user must have sent something
        receiverId: senderId, // admin must be receiver
      });

      if (!existingMessage) {
        return socket.emit(
          "errorMessage",
          "You can only reply to received messages."
        );
      }
    }

    // Proceed to save and emit message
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", {
        senderId,
        message,
        timestamp: newMessage.timestamp,
      });
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});
server.listen(5000, () => console.log("Server running on port 5000"));
