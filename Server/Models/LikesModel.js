const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
      articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true, index: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );
  
  LikeSchema.index({ userId: 1, articleId: 1 }, { unique: true }); 
  
  module.exports = mongoose.model("Like", LikeSchema);
  