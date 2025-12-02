import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const roleMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId; // Set by authMiddleware

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Check role
            // If requiredRole is 'teacher', allow 'teacher' or 'admin'
            // If requiredRole is 'admin', allow only 'admin'

            if (requiredRole === "teacher") {
                if (user.role === "teacher" || user.role === "admin" || user.isAdmin) {
                    return next();
                }
            } else if (requiredRole === "admin") {
                if (user.role === "admin" || user.isAdmin) {
                    return next();
                }
            } else {
                // Exact match for other roles
                if (user.role === requiredRole) {
                    return next();
                }
            }

            return res.status(403).json({ success: false, message: "Access denied: Insufficient permissions" });
        } catch (err) {
            console.error("roleMiddleware error:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
};
