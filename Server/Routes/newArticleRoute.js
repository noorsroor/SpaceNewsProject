const express = require("express");
const { createArticle } = require("../Controllers/newArticleController");
const  authMiddleware  = require("../Middlewares/authMiddleware");
const upload = require("../Multer/multerConfig"); 

const router = express.Router();

router.post("/create", authMiddleware , upload.array("featuredImage", 5), createArticle);

module.exports = router;