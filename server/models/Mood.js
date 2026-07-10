import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    enum: ["happy", "neutral", "sad", "angry", "anxious"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;