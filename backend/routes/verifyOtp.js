const express = require('express');
const router = express.Router();

// Temporary storage for OTPs (for demonstration purposes)
const otpStore = {}; // This should be replaced with a more secure solution in production

// Verify OTP endpoint
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Log the incoming request for debugging
  console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`);

  // Check if the OTP matches the stored value
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after verification
    return res.status(200).json({ message: 'OTP verified successfully. You can reset your password now.' });
  } else {
    console.error('Invalid OTP provided.'); // Log invalid OTP attempt
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }
});

module.exports = router;
