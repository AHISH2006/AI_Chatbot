import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";


import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";

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