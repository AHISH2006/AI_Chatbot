require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const moodRoutes = require("./routes/moodRoutes");

const app = express();   // ✅ create app FIRST

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/mood", moodRoutes);

// Check API key
console.log("Loaded cohereai:", process.env.COHERE_API_KEY ? "YES" : "NO");

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});