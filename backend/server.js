const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New message from ${name} (${email}): ${message}`);
    res.json({ message: "Message received!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
