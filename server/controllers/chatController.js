const { CohereClient } = require("cohere-ai");
const Chat = require("../models/Chat");
require("dotenv").config();

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

exports.sendMessage = async (req, res) => {
    const { message } = req.body;

    try {
        if (!process.env.COHERE_API_KEY) {
            return res.status(500).json({ error: "Cohere API key missing" });
        }

        // Fetch last 10 chats
        const history = await Chat.find()
            .sort({ createdAt: -1 })
            .limit(10);

        // Convert DB history to Cohere chat format
        const chatHistory = history.reverse().flatMap(chat => [
            {
                role: "USER",
                message: chat.userMessage
            },
            {
                role: "CHATBOT",
                message: chat.botReply
            }
        ]);

        const response = await cohere.chat({
           model: "command-a-03-2025",


            message: message,
            chatHistory: chatHistory,
            temperature: 0.7,
        });

        const reply = response.text;

        // Save conversation
        await Chat.create({
            userMessage: message,
            botReply: reply,
        });

        res.json({ reply });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI service error" });
    }
};
