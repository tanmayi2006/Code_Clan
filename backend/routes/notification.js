const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// ✅ Make sure this exact route exists
router.post('/sendNotification', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newNotification = new Notification({ message });
    await newNotification.save();

    res.status(201).json({ success: true, message: 'Notification saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


// API to fetch notifications from MongoDB
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
