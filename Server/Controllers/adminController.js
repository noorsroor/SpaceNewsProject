const Article = require("../Models/articlesModel");
const Journalist = require("../Models/JournalistModel");
const User = require("../Models/userModel");
const Comment = require("../Models/CommentModel");
const crypto = require("crypto");

// Get various metrics for the admin dashboard
exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArticles = await Article.countDocuments();
    const pendingArticles = await Article.countDocuments({ status: "pending" });
    const approvedArticles = await Article.countDocuments({
      status: "approved",
    });
    const totalJournalists = await User.countDocuments({ role: "journalist" });
    const pendingJournalists = await Journalist.countDocuments({
      status: "pending",
    });
    const totalComments = await Comment.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalArticles,
        pendingArticles,
        approvedArticles,
        totalJournalists,
        pendingJournalists,
        totalComments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log("Fetching article with ID:", articleId); // debug
    const article = await Article.findById(articleId);
    console.log("Article found:", article); // debug
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, article });
  } catch (error) {
    console.error("Error in getArticleById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an article's status (approve or reject)
exports.updateArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expected status: 'approved' or 'rejected'
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status provided" });
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedArticle) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, article: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all journalist requests/accounts
exports.getJournalists = async (req, res) => {
  try {
    const journalists = await Journalist.find();
    res.status(200).json({ success: true, journalists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve or reject a journalist
exports.approveRejectJournalist = async (req, res) => {
  const { id } = req.params; // Journalist document ID
  const { status } = req.body; // Expected: "approved" or "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    // 1) Find the Journalist document
    const journalist = await Journalist.findById(id);
    if (!journalist) {
      return res
        .status(404)
        .json({ success: false, message: "Journalist not found" });
    }

    if (status === "approved") {
      // 2) Update the journalist document to reflect "approved" status
      journalist.status = "approved";
      await journalist.save();

      // 3) Use the referenced userId to update the corresponding User document
      let user = await User.findById(journalist.userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Corresponding user not found" });
      }
      // Update the user's role to "journalist"
      user.role = "journalist";
      await user.save();
    } else {
      // For rejection, simply update the status
      journalist.status = "rejected";
      await journalist.save();
    }

    res
      .status(200)
      .json({ success: true, message: `Journalist ${status} successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all registered users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all comments for moderation or review
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// New route to fetch monthly user growth data
exports.getMonthlyUserGrowth = async (req, res) => {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const growthData = months.map(async (month, index) => {
      const firstDayOfMonth = new Date(new Date().getFullYear(), index, 1);
      const lastDayOfMonth = new Date(new Date().getFullYear(), index + 1, 0);

      const monthlyData = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            readers: { $sum: { $cond: [{ $eq: ["$role", "reader"] }, 1, 0] } },
            journalists: {
              $sum: { $cond: [{ $eq: ["$role", "journalist"] }, 1, 0] },
            },
            admins: { $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] } },
          },
        },
      ]);

      return {
        month,
        readers: monthlyData[0]?.readers || 0,
        journalists: monthlyData[0]?.journalists || 0,
        admins: monthlyData[0]?.admins || 0,
      };
    });

    const finalData = await Promise.all(growthData);
    res.status(200).json(finalData);
  } catch (error) {
    console.error("Error fetching monthly growth data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change user role (admin, reader, journalist)
exports.changeUserRole = async (req, res) => {
  const { id } = req.params; // Get user ID from URL
  const { role } = req.body; // Role can be 'admin', 'reader', or 'journalist'
  if (!["admin", "reader", "journalist"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.role = role;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft-delete a user
exports.softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // First, look in the User collection
    let user = await User.findById(id);
    if (user) {
      user.isDeleted = true;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "User soft-deleted successfully" });
    } else {
      // If not found in User, try the Journalist collection
      let journalist = await Journalist.findById(id);
      if (!journalist) {
        return res.status(404).json({
          success: false,
          message: "User not found in any collection",
        });
      }
      // Mark the journalist document as deleted (if applicable)
      journalist.isDeleted = true;
      await journalist.save();
      return res.status(200).json({
        success: true,
        message: "Journalist soft-deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
