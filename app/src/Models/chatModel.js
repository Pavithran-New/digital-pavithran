const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,         // user ID (admin or customer)
  receiverId: String,       // the other user
  message: String,
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Message", messageSchema);
