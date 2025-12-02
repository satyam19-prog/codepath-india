import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserProgress = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const progress = await prisma.userProgress.findUnique({ where: { userId } });

    if (!progress) {
      return res.json({ success: true, progress: { solved: 0, streak: 0, rating: 1200, ranking: null } });
    }

    res.json({ success: true, progress });
  } catch (err) {
    console.error("getUserProgress error:", err);
    res.status(500).json({ success: false, message: "Failed to get progress", err });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const progress = await prisma.userProgress.findUnique({ where: { userId } });

    res.json({ success: true, user, progress: progress || { solved: 0, streak: 0, rating: 1200 } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await prisma.userProgress.findMany({
      take: 10,
      orderBy: [
        { rating: 'desc' },
        { solved: 'desc' }
      ],
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });

    res.json({ success: true, leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching leaderboard" });
  }
};