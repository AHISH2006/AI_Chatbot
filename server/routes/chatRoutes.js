import express from "express";
import { sendMessage } from "../controllers/chatController.js";
import crisisDetection from "../middleware/crisisDetection.js";

const router = express.Router();

router.post("/", crisisDetection, sendMessage);

export default router;