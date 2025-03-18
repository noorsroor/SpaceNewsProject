const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "articles", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
    username: { type: String, required: true }, // إضافة حقل اسم المستخدم
  },
  { timestamps: true } // إضافة timestamps لتسجيل التواريخ تلقائيًا
);

module.exports = mongoose.model("Comments", CommentSchema);