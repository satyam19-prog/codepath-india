import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Create a classroom (Teacher only)
export const createClassroom = async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.userId;

    // Generate a 6-character unique code
    const code = uuidv4().substring(0, 6).toUpperCase();

    const classroom = await prisma.classroom.create({
      data: {
        name,
        code,
        teacherId,
      },
    });

    res.status(201).json({ success: true, classroom });
  } catch (err) {
    console.error("createClassroom error:", err);
    res.status(500).json({ success: false, message: "Failed to create classroom" });
  }
};

// Join a classroom (Student)
export const joinClassroom = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.userId;

    const classroom = await prisma.classroom.findUnique({
      where: { code },
    });

    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }

    // Check if already joined
    const existing = await prisma.classroomStudent.findUnique({
      where: {
        classroomId_userId: {
          classroomId: classroom.id,
          userId: studentId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "Already joined this classroom" });
    }

    // Add student to classroom
    await prisma.classroomStudent.create({
      data: {
        classroomId: classroom.id,
        userId: studentId,
      },
    });

    res.json({ success: true, message: "Joined classroom successfully", classroom });
  } catch (err) {
    console.error("joinClassroom error:", err);
    res.status(500).json({ success: false, message: "Failed to join classroom" });
  }
};

// Get classroom details (with students)
export const getClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await prisma.classroom.findUnique({
      where: { id: Number(id) },
      include: {
        students: {
          include: {
            user: {
              select: { id: true, name: true, email: true, userProgress: true },
            },
          },
        },
        teacher: {
          select: { id: true, name: true },
        },
      },
    });

    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }

    res.json({ success: true, classroom });
  } catch (err) {
    console.error("getClassroom error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch classroom" });
  }
};

// Get all classrooms for a user (either teaching or student)
export const getUserClassrooms = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if teacher
    const teaching = await prisma.classroom.findMany({
      where: { teacherId: userId },
    });

    // Check if student
    const studentRecords = await prisma.classroomStudent.findMany({
      where: { userId },
      include: { classroom: true },
    });
    const studying = studentRecords.map(r => r.classroom);

    res.json({ success: true, teaching, studying });
  } catch (err) {
    console.error("getUserClassrooms error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch classrooms" });
  }
};
