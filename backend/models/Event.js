const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  thumbnail: { type: String }, // Store image URL or path
});

module.exports = mongoose.model('Event', EventSchema);
