const Comment = require('../Models/CommentModel');
const Article = require('../Models/articlesModel');
const User = require('../Models/UserModel'); // استيراد نموذج المستخدم

exports.addComment = async (req, res) => {
  const { articleId } = req.params;
  const { userId, content } = req.body;

  try {
    // التحقق من وجود المقالة
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'المقالة غير موجودة.' });
    }

    // التحقق من وجود المستخدم
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود.' });
    }

    // إنشاء تعليق جديد مع اسم المستخدم
    const comment = new Comment({
      articleId,
      userId,
      content,
      username: user.fullName, // إضافة اسم المستخدم إلى التعليق
    });
    await comment.save();

    // إضافة التعليق إلى المقالة (اختياري)
    article.comments.push(comment._id);
    await article.save();

    // إرجاع التعليق مع اسم المستخدم
    res.status(201).json({ message: 'تمت إضافة التعليق بنجاح.', comment });
  } catch (error) {
    console.error("❌ خطأ في إضافة التعليق:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة التعليق.', error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { articleId } = req.params;

  try {
    // التحقق من وجود المقالة
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'المقالة غير موجودة.' });
    }

    // جلب جميع التعليقات المرتبطة بالمقالة
    const comments = await Comment.find({ articleId })
      .sort({ createdAt: -1 }); // ترتيب التعليقات من الأحدث إلى الأقدم

    res.status(200).json({ comments });
  } catch (error) {
    console.error("❌ خطأ في جلب التعليقات:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب التعليقات.', error: error.message });
  }
};