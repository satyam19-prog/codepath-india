# CodePath India - Advanced Coding Platform

A modern, gamified coding platform designed to help students master data structures and algorithms. Features include real-time code execution, Codeforces integration, classroom management for teachers, and a sleek glassmorphism UI.

## 🚀 Features

### 1. **Authentication & Roles**
-   **Secure Auth**: JWT-based authentication with bcrypt password hashing.
-   **Role-Based Access Control (RBAC)**:
    -   **Student**: Solve problems, join classrooms, track progress.
    -   **Teacher**: Create classrooms, view student progress.
    -   **Admin**: Create/Edit manual challenges, manage platform.

### 2. **Challenges & Code Execution**
-   **Manual Challenges**: Admins can create custom problems with test cases.
-   **Codeforces Integration**: Browse and filter thousands of problems directly from Codeforces (via custom proxy to bypass CORS).
-   **Real-time Judge**: Integrated with **Judge0** to execute code in C++, Java, Python, and JavaScript against hidden test cases.
-   **Monaco Editor**: Professional-grade code editor with syntax highlighting.

### 3. **Classrooms**
-   **For Teachers**: Create private classrooms and generate unique 6-digit join codes.
-   **For Students**: Join classrooms to share progress with instructors.
-   **Dashboard**: Teachers can view a roster of students and their solved counts.

### 4. **Gamification**
-   **Leaderboard**: Global ranking based on solved problems and rating.
-   **Stats**: Track "Streak", "Total Solved", and "Rating".
-   **Badges**: Visual rewards for milestones (UI implementation).

### 5. **Modern UI/UX**
-   **"LightRay" Theme**: A custom glassmorphism design system with blurred backgrounds, gradients, and smooth animations.
-   **Responsive**: Fully optimized for desktop and tablet experiences.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React.js (Vite)
-   **Styling**: Vanilla CSS (Glassmorphism, CSS Variables)
-   **State Management**: React Context API
-   **Editor**: @monaco-editor/react

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MySQL (hosted on Aiven)
-   **ORM**: Prisma
-   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
-   **External APIs**: Codeforces API, Judge0 (RapidAPI)

---

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v16+)
-   MySQL Database (Local or Cloud)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/codepath-india.git
cd codepath-india
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

**Create a `.env` file in `backend/`:**
\`\`\`env
PORT=3000
DATABASE_URL="mysql://user:password@host:port/dbname"
JWT_SECRET="your_super_secret_key"
FRONTEND_URL="http://localhost:5173"
# Optional: Judge0 API Key if using RapidAPI
RAPIDAPI_KEY="your_rapidapi_key"
\`\`\`

**Run Database Migrations:**
\`\`\`bash
npx prisma migrate dev --name init
node seed_data.js  # Optional: Seeds dummy data
\`\`\`

**Start Server:**
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd ../frontend
npm install
\`\`\`

**Create a `.env` file in `frontend/`:**
\`\`\`env
VITE_API_URL="http://localhost:3000"
\`\`\`

**Start Client:**
\`\`\`bash
npm run dev
\`\`\`

---

## 📚 API Documentation

### Auth
-   `POST /api/auth/register` - Register new user
-   `POST /api/auth/login` - Login user
-   `GET /api/auth/me` - Get current user details

### Challenges
-   `GET /api/challenges` - List manual challenges
-   `GET /api/challenges/codeforces` - List Codeforces problems (Filtered)
-   `POST /api/challenges/create` - Create challenge (Admin only)

### Classrooms
-   `POST /api/classrooms/create` - Create classroom (Teacher only)
-   `POST /api/classrooms/join` - Join classroom via code
-   `GET /api/classrooms/my` - List user's classrooms

### Submissions
-   `POST /api/submissions/run` - Run code without saving
-   `POST /api/submissions/submit` - Submit solution for grading

---

## 🤝 Contributing
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License
Distributed under the MIT License.
