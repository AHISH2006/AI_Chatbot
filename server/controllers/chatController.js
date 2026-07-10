import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
import Chat from "../models/Chat.js";

dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    if (!process.env.COHERE_API_KEY) {
      return res.status(500).json({
        error: "Cohere API key missing",
      });
    }

    const history = await Chat.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const chatHistory = history.reverse().flatMap((chat) => [
      {
        role: "USER",
        message: chat.userMessage,
      },
      {
        role: "CHATBOT",
        message: chat.botReply,
      },
    ]);

    const response = await cohere.chat({
      model: "command-a-03-2025",
      message,
      chatHistory,
      temperature: 0.7,
    });

    const reply = response.text;

    await Chat.create({
      userMessage: message,
      botReply: reply,
    });

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "AI service error",
    });
  }
};