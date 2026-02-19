const OpenAI = require("openai");
const Chat = require("../models/Chat");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.sendMessage = async (req, res) => {
    const { message } = req.body;

    try {
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "OpenAI API key missing" });
        }

        // Fetch last 10 chats from DB
        const history = await Chat.find()
            .sort({ createdAt: -1 })
            .limit(10);

        const formattedHistory = history.reverse().flatMap(chat => [
            { role: "user", content: chat.userMessage },
            { role: "assistant", content: chat.botReply || "" }
        ]);

        const systemMessage = {
            role: "system",
            content: `You are a compassionate mental health support assistant.
- Do NOT diagnose.
- Do NOT prescribe medication.
- If self-harm intent detected, encourage professional help.
- Use supportive tone.
- Keep responses under 100 words.`
        };

        const messages = [
            systemMessage,
            ...formattedHistory,
            { role: "user", content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            max_tokens: 150,
        });

        const reply = completion.choices[0].message.content;

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
