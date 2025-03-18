const mongoose = require('mongoose');

const ReadingHistorySchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
      articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true, index: true },
      lastReadAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("ReadingHistory", ReadingHistorySchema);
