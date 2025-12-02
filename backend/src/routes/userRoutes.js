import express from "express";
import { getUserProgress, getUserProfile, getLeaderboard } from "../controllers/userController.js";

const router = express.Router();

router.get("/progress/:userId", getUserProgress);
router.get("/profile/:userId", getUserProfile);
router.get("/leaderboard", getLeaderboard);

export default router;