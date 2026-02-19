const Mood = require("../models/Mood");

exports.saveMood = async (req, res) => {
    const { mood } = req.body;

    try {
        if (!mood) {
            return res.status(400).json({ error: "Mood is required" });
        }

        const newMood = await Mood.create({ mood });
        res.status(201).json({ message: "Mood saved", data: newMood });

    } catch (error) {
        console.error("Mood Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
