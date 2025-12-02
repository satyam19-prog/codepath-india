import express from "express";
import { submitSolution, runCode } from "../controllers/submissionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only authenticated users can submit
router.post("/", authMiddleware, submitSolution);
router.post("/run", authMiddleware, runCode);

export default router;