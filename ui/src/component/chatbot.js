import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./chatpopup.css";

const socket = io("http://localhost:5000");

const ChatBox = ( {targetUserId} ) => {
   const currentUser = JSON.parse(localStorage.getItem("user"));
  const role = currentUser?.role;

  const currentUserId=currentUser?._id;
  console.log(targetUserId,'currentUser_id',currentUserId)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

 

  useEffect(() => {
    if (currentUserId) {
      socket.emit("register", currentUserId);

      socket.on("receive_message", ({ senderId, content }) => {
        setChat((prev) => [...prev, { senderId, content }]);
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [currentUserId]);

  useEffect(() => {
    if (open) {
      if (role === "admin") {
        // Load users who messaged admin
        axios
          .get(`http://localhost:8081/api/chat/senders/${currentUserId}`)
          .then((res) => setUserList(res.data))
          .catch((err) => console.error("Error fetching user list:", err));
      } else {
        // Load chat history with admin
        const adminId = targetUserId // Replace with actual admin ID
        axios
          .get(
            `http://localhost:8081/api/chat/history/${currentUserId}/${adminId}`
          )
          .then((res) => setChat(res.data))
          .catch((err) => console.error("Error fetching chat history:", err));
      }
    }
  }, [open, currentUserId, role]);

  // Fetch chat history for selected user (admin only)
  useEffect(() => {
    if (role === "admin" && selectedUserId) {
      axios
        .get(
          `http://localhost:8081/api/chat/history/${currentUserId}/${selectedUserId}`
        )
        .then((res) => setChat(res.data))
        .catch((err) => console.error("Error loading chat:", err));
    }
  }, [selectedUserId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    let receiverId = null;
    if (role === "admin") {
      if (!selectedUserId) return;
      receiverId = selectedUserId;
    } else {
      receiverId = targetUserId; // Replace with real admin ID
    }

    const msgData = {
      senderId: currentUserId,
      receiverId,
      message: message,
    };

    // Emit through socket
    socket.emit("private_message", msgData);

    // Save to DB
    try {
      await axios.post("http://localhost:8081/api/chat/send", msgData);
    } catch (err) {
      console.error("Failed to save message:", err);
    }

    // Update UI
    setChat((prev) => [...prev, { senderId: currentUserId,  message }]);
    setMessage("");
  };

  return (
    <>
      <div onClick={() => setOpen(!open)} className="chat-toggle-btn">
        💬
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">Chat Support</div>

          {role === "admin" && (
            <div className="user-selection">
              <h4>Select a user:</h4>
              {userList.map((userId) => (
                <label key={userId}>
                  <input
                    type="radio"
                    name="user"
                    value={userId}
                    checked={selectedUserId === userId}
                    onChange={() => setSelectedUserId(userId)}
                  />
                  {userId}
                </label>
              ))}
            </div>
          )}

          <div className="chat-body">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.senderId === currentUserId ? "user-msg" : "admin-msg"
                }
              >
                <div className="message-bubble">{msg.message}</div>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="chat-input"
              placeholder="Type a message..."
              disabled={role === "admin" && !selectedUserId}
            />
            <button
              onClick={sendMessage}
              className="send-btn"
              disabled={role === "admin" && !selectedUserId}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
