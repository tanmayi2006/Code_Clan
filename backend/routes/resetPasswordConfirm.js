const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key for JWT (should be stored securely)
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Reset Password endpoint
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = newPassword; // Ideally, hash the password before saving
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
});

module.exports = router;
