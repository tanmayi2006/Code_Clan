const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

// Secret key for JWT (should be stored securely)
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Set up Nodemailer to send email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'praneethaimandi@gmail.com', // Your email
    pass: 'your-email-password', // Your email password
  },
});

// Request Password Reset endpoint
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    // Send reset link via email
    const mailOptions = {
      from: 'praneethaimandi@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: http://localhost:5000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (error) {
    console.error('Error requesting password reset:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
