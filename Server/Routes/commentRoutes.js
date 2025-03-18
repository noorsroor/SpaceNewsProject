const express = require('express');
const CommentController = require('../Controllers/commentController');

const router = express.Router();

// إضافة تعليق جديد
router.post('/:articleId/comment', CommentController.addComment);

// عرض جميع التعليقات لمقال معين
router.get('/:articleId/comments', CommentController.getComments);

module.exports = router;