const express = require("express");
const router = express.Router();
const { details } = require("../Controllers/userController.js");

router.get("/details/:id", details);

module.exports = router;
