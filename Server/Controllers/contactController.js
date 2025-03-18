// controllers/contactController.js
const Contact = require('../models/contactModel');

const submitContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Log incoming data
    console.log('Received contact message:', req.body); // Debug log

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    // Save message to MongoDB
    await newMessage.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error); // Error log
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { submitContactMessage };
