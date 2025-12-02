import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://codepath-india-frontend.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});