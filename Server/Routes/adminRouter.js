// Routes/adminRouter.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const adminMiddleware = require("../Middlewares/adminMiddleware");
const adminController = require("../Controllers/adminController");

// Secure all admin routes with authentication and admin role verification
router.use(authMiddleware, adminMiddleware);

// Dashboard metrics
router.get("/dashboard", adminController.getDashboardMetrics);

// Manage articles
router.get("/articles", adminController.getArticles);
router.get("/articles/:id", adminController.getArticleById);
router.put("/articles/:id/status", adminController.updateArticleStatus);

// Manage journalists
router.get("/journalists", adminController.getJournalists);
router.put("/journalists/:id/status", adminController.approveRejectJournalist);

// Change user role (admin, reader, journalist)
router.put("/users/:id/role", adminController.changeUserRole);

// Soft-delete user
router.delete("/users/:id", adminController.softDeleteUser);

// Manage users
router.get("/users", adminController.getUsers);

// Get monthly user growth data
router.get("/monthlyGrowthData", adminController.getMonthlyUserGrowth);

// Retrieve comments
router.get("/comments", adminController.getComments);

module.exports = router;
