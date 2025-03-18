const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true, index: true },
    },
    { timestamps: true }
  );
  
  BookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true }); 
  
  module.exports = mongoose.model("Bookmarks", BookmarkSchema);
  