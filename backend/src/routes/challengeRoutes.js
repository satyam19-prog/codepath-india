import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  getCodeforcesProblems,
} from "../controllers/challengeController.js";

const router = express.Router();

// Public
router.get("/codeforces", getCodeforcesProblems);
router.get("/", getChallenges);
router.get("/:id", getChallengeById);

// Admin only
router.post("/create", authMiddleware, adminMiddleware, createChallenge);
router.put("/:id", authMiddleware, adminMiddleware, updateChallenge);
router.delete("/:id", authMiddleware, adminMiddleware, deleteChallenge);

export default router;