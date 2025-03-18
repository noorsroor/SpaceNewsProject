// routes/LikeRouter.js
const express = require('express');
const LikeController = require('../Controllers/LikeController');

const router = express.Router();

router.post('/:articleId/like', LikeController.likeArticle);
router.delete('/:articleId/unlike', LikeController.unlikeArticle);
router.get('/:articleId/likes', LikeController.getLikesCount);

module.exports = router;