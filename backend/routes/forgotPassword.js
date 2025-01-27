const express = require('express');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

// Temporary storage for OTPs (for demonstration purposes)
const otpStore = {}; // This should be replaced with a more secure solution in production

// Forgot Password endpoint
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    otpStore[email] = otp; // Store OTP temporarily

    // Configure Nodemailer with SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'konatanmayi@gmail.com', // Your email
        pass: 'dayk wirm laaj prcg', // Replace this with your App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send OTP via email
    const mailOptions = {
      from: 'konatanmayi@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Error sending OTP:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
