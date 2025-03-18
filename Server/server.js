require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/signupRouter"); // Import your auth routes for registration
const user = require("./Routes/user");
const contactRoutes = require("./Routes/contactRouter");
const adminRouter = require("./Routes/adminRouter");
const journalistRouter = require("./Routes/journalistRouter");
const authMiddleware = require("./Middlewares/authMiddleware");
const articleRoutes = require("./Routes/articlesRoute");
const newArticleRoutes = require("./Routes/newArticleRoute");
const LikeRouter = require("./Routes/LikeRouter");
const CommentRouter = require("./Routes/commentRoutes"); // استيراد CommentRouter

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: "*", // Make sure this is the correct frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api", journalistRouter);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", newArticleRoutes);
app.use("/api/user", user);
app.use("/api/admin", adminRouter);
app.use("/api", contactRoutes);
app.use("/api/articles", LikeRouter);
app.use("/api/articles", CommentRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the uploads folder
// Middleware
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using connectDB function
connectDB();

// Routes

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
