const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Event');

// Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST: Add an event
router.post('/addEvent', upload.single('thumbnail'), async (req, res) => {
  try {
    const { name, type, time, date } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    const newEvent = new Event({ name, type, time, date, thumbnail });
    await newEvent.save();

    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// GET: Fetch all events
router.get('/getEvents', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
