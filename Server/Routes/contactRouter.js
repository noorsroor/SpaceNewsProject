// routes/contactRouter.js
const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../Controllers/contactController');

// Define the POST route
router.post('/contacts', submitContactMessage);  // Ensure the route is '/contacts' and matches your fetch

module.exports = router;
