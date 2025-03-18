const express = require("express");
const { getAllArticles } = require("../Controllers/articlesController");
const authMiddleware = require("../Middlewares/authMiddleware");
const { viewArticle } = require("../Controllers/articlesController");
const { getTopViewedArticles } = require("../Controllers/articlesController");
const { getArticleById } = require("../Controllers/articlesController");


const router = express.Router();

// ✅ Route to get all articles with pagination & sorting
router.get("/filter", getAllArticles);
// Route to handle article view count and reading history
router.post("/view/:articleId",authMiddleware, viewArticle);
router.get("/top-viewed", getTopViewedArticles);
router.get('/articles/:id', getArticleById);
router.get("/get/:id", getArticleById);



module.exports = router;
