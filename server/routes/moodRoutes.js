import express from "express";
import { saveMood } from "../controllers/moodController.js";

const router = express.Router();

router.post("/", saveMood);

export default router;