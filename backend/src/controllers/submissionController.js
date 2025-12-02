import { PrismaClient } from "@prisma/client";
import { submitToJudge0, getJudge0Result } from "../services/judge0Service.js";

const prisma = new PrismaClient();

// Map languages
const languageMap = {
  cpp: 54,
  c: 50,
  python: 71,
  java: 62,
  javascript: 63,
};

export const submitSolution = async (req, res) => {
  try {
    const userId = req.userId;
    const { challengeId, sourceCode, language } = req.body;
    const language_id = languageMap[language];

    if (!language_id) return res.status(400).json({ success: false, message: "Invalid language" });

    // Fetch challenge to get test cases
    const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
    if (!challenge) return res.status(404).json({ success: false, message: "Challenge not found" });

    // Create submission (pending)
    const submission = await prisma.submission.create({
      data: {
        userId,
        challengeId,
        sourceCode,
        language,
        status: "pending"
      }
    });

    let finalStatus = "passed";
    let finalResult = {};

    // If manual challenge with test cases
    if (challenge.type === "manual" && challenge.testCases && Array.isArray(challenge.testCases) && challenge.testCases.length > 0) {
      for (const tc of challenge.testCases) {
        const token = await submitToJudge0(sourceCode, language_id, tc.input);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for execution
        const result = await getJudge0Result(token);

        // Check for errors
        if (result.status?.id >= 6) { // Compilation error or runtime error
          finalStatus = "failed";
          finalResult = result;
          break;
        }

        // Compare output (trim whitespace)
        const actualOutput = (result.stdout || "").trim();
        const expectedOutput = (tc.output || "").trim();

        if (actualOutput !== expectedOutput) {
          finalStatus = "failed";
          finalResult = { ...result, message: `Failed on test case. Expected: ${expectedOutput}, Got: ${actualOutput}` };
          break;
        }

        finalResult = result; // Keep last result if passed
      }
    } else {
      // Fallback for no test cases or Codeforces (just run once with empty input)
      const token = await submitToJudge0(sourceCode, language_id, "");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const result = await getJudge0Result(token);

      const statusDesc = result.status?.description || "error";
      if (!/accepted/i.test(statusDesc)) finalStatus = "failed";
      finalResult = result;
    }

    // Update DB
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: finalStatus,
        result: JSON.stringify(finalResult)
      }
    });

    // Update User Progress
    if (finalStatus === "passed") {
      await updateProgress(userId);
    }

    res.json({ success: true, status: finalStatus, result: finalResult });
  } catch (err) {
    console.error("submitSolution error:", err);
    res.status(500).json({ success: false, message: "Submission error", err: err?.message || err });
  }
};

// Run code without saving submission
export const runCode = async (req, res) => {
  try {
    const { sourceCode, language, stdin } = req.body;
    const language_id = languageMap[language];

    if (!language_id) return res.status(400).json({ success: false, message: "Invalid language" });

    // Send to Judge0
    const token = await submitToJudge0(sourceCode, language_id, stdin);

    // Wait briefly
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get result
    const result = await getJudge0Result(token);

    res.json({ success: true, result });
  } catch (err) {
    console.error("runCode error:", err);
    res.status(500).json({ success: false, message: "Execution error", err: err?.message || err });
  }
};

// progress update
async function updateProgress(userId) {
  const progress = await prisma.userProgress.findUnique({ where: { userId } });

  if (!progress) {
    await prisma.userProgress.create({
      data: { userId, solved: 1, streak: 1, rating: 1210 }
    });
  } else {
    await prisma.userProgress.update({
      where: { userId },
      data: {
        solved: progress.solved + 1,
        streak: progress.streak + 1,
        rating: progress.rating + 10
      }
    });
  }
}