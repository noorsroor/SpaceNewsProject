const Article = require("../Models/articlesModel");
const ReadingHistory = require("../Models/ReadingHistoryModel");

exports.viewArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user ? req.user._id : null; // Check if user is logged in

    // Find the article
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Increment the views count
    article.viewsCount += 1;
    await article.save();

    console.log(articleId);
    // If user is logged in, update their reading history
    if (userId) {
      const readingHistory = await ReadingHistory.findOne({
        userId,
        articleId,
      });

      if (readingHistory) {
        readingHistory.lastReadAt = new Date();
        await readingHistory.save();
      } else {
        await ReadingHistory.create({
          userId,
          articleId,
          lastReadAt: new Date(),
        });
      }
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Article viewed",
        views: article.viewsCount,
      });
  } catch (error) {
    console.error("Error updating article views:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get All Approved Articles (Pagination & Sorting)
exports.getAllArticles = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      category,
      author,
      search,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Filter only approved articles
    const query = { status: "approved" };

    if (category) query.category = category;
    if (author) query.author = author;
    if (search) query.title = { $regex: search, $options: "i" };

    const articles = await Article.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Article.countDocuments(query);

    res
      .status(200)
      .json({
        success: true,
        articles,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/articleController.js
exports.getTopViewedArticles = async (req, res) => {
  try {
    // Fetch the top 4 most viewed articles with status 'approved'
    const topArticles = await Article.find({ status: "approved" })
      .sort({ viewsCount: -1 }) // Sort by highest viewsCount
      .limit(4); // Get only 4 articles

    res.status(200).json({ success: true, articles: topArticles });
  } catch (error) {
    console.error("Error fetching top viewed articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
    try {
      let {
        page = 1,
        limit = 10,
        sort = "-createdAt",
        category,
        author,
        search,
      } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const query = {};
      if (category) query.category = category;
      if (author) query.author = author;
      if (search) query.title = { $regex: search, $options: "i" };

      const articles = await Article.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Article.countDocuments(query);

      res
        .status(200)
        .json({
          success: true,
          articles,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Get Article By ID
exports.getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id; // get id from url

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Article By ID
exports.getArticleById = async (req, res) => {
  try {
    const { id: articleId } = req.params; // استخراج ID من الـ URL

    if (!articleId) {
      return res.status(400).json({ message: "Article ID is required" });
    }

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
