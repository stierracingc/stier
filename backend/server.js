const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const messagesFilePath = path.join(__dirname, "messages.json");

// 🔸 Create the file if it doesn't exist
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([]));
}

// 🔹 Save message to file
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };

  // Read existing messages
  const existingMessages = JSON.parse(fs.readFileSync(messagesFilePath));

  // Add new message and save
  existingMessages.push(newMessage);
  fs.writeFileSync(messagesFilePath, JSON.stringify(existingMessages, null, 2));

  console.log(`New message stored from ${name} (${email})`);
  res.json({ message: "Message received and saved successfully!" });
});

// 🔹 Optional: View all messages
app.get("/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(messagesFilePath));
  res.json(messages);
});
// 🔻 Clear all messages
app.delete("/messages", (req, res) => {
    fs.writeFileSync(messagesFilePath, JSON.stringify([])); // Reset to empty array
    res.json({ message: "All messages have been cleared." });
  });  

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

