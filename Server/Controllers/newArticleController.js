const Article = require("../Models/articlesModel");
const upload = require("../Multer/multerConfig");

exports.createArticle = async (req, res) => {
  console.log("Received files:", req.files);
  console.log("Received body:", req.body);

  try {
   
    if (req.user.role === "reader") {
      return res.status(403).json({ error: "Permission denied. Readers cannot publish articles." });
    }

    const { title, content, category, tags, featuredVideo } = req.body;

    
    const featuredImage = req.files?.length > 0 
      ? req.files.map(file => `/uploads/${file.filename}`) 
      : [];

    
    if (!title || !content || !category || !tags || featuredImage.length === 0) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    
    const formattedTags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

    
    const newArticle = new Article({
      title,
      content,
      featuredImage,
      featuredVideo,
      category,
      tags: formattedTags,
      authorId: req.user._id, 
    });

    await newArticle.save();
    res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
