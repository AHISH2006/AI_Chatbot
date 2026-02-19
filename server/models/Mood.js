const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    mood: {
        type: String,
        enum: ["happy", "neutral", "sad", "angry", "anxious"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Mood", moodSchema);
