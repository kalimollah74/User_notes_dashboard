require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const requiredEnvs = ["MONGO_URI", "JWT_SECRET", "JWT_EXPIRES_IN"];
const missingEnvs = requiredEnvs.filter((k) => !process.env[k]);
if (missingEnvs.length) {
    console.error("Missing required environment variables:", missingEnvs.join(", "));
    console.error("Please add them to your .env file or environment before starting the server.");
    process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
