import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Admin creates manual challenge
export const createChallenge = async (req, res) => {
  try {
    const { title, difficulty, tags, statement, testCases } = req.body;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        difficulty,
        tags,
        type: "manual",
        statement,
        testCases: testCases ? JSON.parse(testCases) : [], // Expecting JSON string or array
      },
    });

    return res.json({ success: true, challenge });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to create challenge" });
  }
};

// ✅ Public - get all challenges
export const getChallenges = async (req, res) => {
  try {
    const challenges = await prisma.challenge.findMany();
    res.json({ success: true, challenges });
  } catch (err) {
    res.json({ success: false, message: "Error fetching challenges" });
  }
};

// ✅ Public - get 1 challenge
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: Number(req.params.id) }
    });

    res.json({ success: true, challenge });
  } catch (err) {
    res.json({ success: false, message: "Error fetching challenge" });
  }
};

// ✅ Admin update challenge
export const updateChallenge = async (req, res) => {
  try {
    const challenge = await prisma.challenge.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    return res.json({ success: true, challenge });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update challenge" });
  }
};

// ✅ Admin delete challenge
export const deleteChallenge = async (req, res) => {
  try {
    await prisma.challenge.delete({
      where: { id: Number(req.params.id) }
    });

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete challenge" });
  }
};

// ✅ Get Codeforces Problems (Proxy)
import axios from "axios";
export const getCodeforcesProblems = async (req, res) => {
  try {
    const response = await axios.get("https://codeforces.com/api/problemset.problems");
    if (response.data.status === "OK") {
      return res.json({ success: true, data: response.data.result });
    } else {
      return res.status(500).json({ success: false, message: "Codeforces API error" });
    }
  } catch (err) {
    console.error("CF Proxy Error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch from Codeforces" });
  }
};