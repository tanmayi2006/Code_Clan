const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const forgotPasswordRoutes = require('./routes/forgotPassword');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process'); // Import child_process to run Python
const eventRoutes = require('./routes/event');
const notificationRoutes = require('./routes/notification.js');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', eventRoutes);
app.use('/api', notificationRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://praneethaimandi:praneetha@college-radio.chnmb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', forgotPasswordRoutes);

// WebRTC Signaling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('offer', (data) => socket.broadcast.emit('offer', data));
  socket.on('answer', (data) => socket.broadcast.emit('answer', data));
  socket.on('candidate', (data) => socket.broadcast.emit('candidate', data));

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

// Start transcription Python script
const pythonProcess = spawn('python', ['transcription.py']); // Ensure 'transcription.py' is in the same folder

pythonProcess.stdout.on('data', (data) => {
  const transcript = data.toString().trim();
  console.log('Transcription:', transcript);
  io.emit('transcription', { text: transcript }); // Send transcript to all clients
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python Error: ${data}`);
});
let notifications = []; // Temporary storage for notifications

// API to post notification
app.post('/api/notifications', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  notifications.push({ message });
  res.json({ success: true, message: 'Notification added' });
});

// API to fetch notifications
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});
// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
