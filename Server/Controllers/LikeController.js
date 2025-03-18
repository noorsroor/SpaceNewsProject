// controllers/LikeController.js
const Like = require('../Models/LikesModel');
const Article = require('../Models/articlesModel');

exports.likeArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // التحقق مما إذا كان المستخدم قد أعجب بالمقالة من قبل
    const existingLike = await Like.findOne({ articleId, userId });
    if (existingLike) {
      return res.status(400).json({ message: 'لقد قمت بالإعجاب بهذه المقالة من قبل.' });
    }

    // التحقق من وجود المقالة
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'المقالة غير موجودة.' });
    }

    // إنشاء إعجاب جديد
    const like = new Like({ articleId, userId });
    await like.save();

    // تحديث عدد الإعجابات في المقالة
    article.likesCount += 1;
    await article.save();

    res.status(201).json({ likesCount: article.likesCount });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الإعجاب بالمقالة.', error });
  }
};

exports.unlikeArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // البحث عن الإعجاب وحذفه
    const like = await Like.findOneAndDelete({ articleId, userId });
    if (!like) {
      return res.status(404).json({ message: 'لم يتم العثور على الإعجاب.' });
    }

    // تحديث عدد الإعجابات في المقالة
    const article = await Article.findById(articleId);
    article.likesCount -= 1;
    await article.save();

    res.status(200).json({ likesCount: article.likesCount });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إزالة الإعجاب.', error });
  }
};

exports.getLikesCount = async (req, res) => {
  const { articleId } = req.params;

  try {
    const likesCount = await Like.countDocuments({ articleId });
    res.status(200).json({ likesCount });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب عدد الإعجابات.', error });
  }
};