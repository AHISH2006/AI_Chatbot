require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const moodRoutes = require("./routes/moodRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/mood", moodRoutes);

console.log("Loaded cohereai:", process.env.COHERE_API_KEY ? "YES" : "NO");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
