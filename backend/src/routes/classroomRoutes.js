import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
    createClassroom,
    joinClassroom,
    getClassroom,
    getUserClassrooms,
} from "../controllers/classroomController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", roleMiddleware("teacher"), createClassroom);
router.post("/join", joinClassroom);
router.get("/my", getUserClassrooms);
router.get("/:id", getClassroom);

export default router;
