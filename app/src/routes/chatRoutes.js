const express = require("express");
const router = express.Router();
const Chat = require("../Models/chatModel"); // adjust path




// routes/chat.js
router.get("/chat/senders/:adminId", async (req, res) => {
 const adminId = req.params.adminId;

  const messages = await Chat.find({ receiverId: adminId });
  const uniqueSenders = [...new Set(messages.map(msg => msg.senderId))];

  res.json(uniqueSenders);
});


// GET /api/chat/:userId
// router.get("/chat/history/:userId/:adminId", async (req, res) => {
  router.get("/chat/history/:userId/:adminId", async (req, res) => {
  const { adminId, userId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: adminId, receiverId: userId },
        { senderId: userId, receiverId: adminId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch messages", details: err.message });
  }
});


router.post("/chat/send", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = new Chat({
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
