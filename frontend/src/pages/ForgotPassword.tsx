import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('JWT Token:', data.token); // Log the token

      if (response.ok) {
        setMessage('Reset link sent to your email.');
        setIsOtpSent(true);
      } else {
        setMessage(data.message || 'Error sending reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error sending reset link.');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }), // Send email and OTP
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP verified. You can reset your password now.');
        // Redirect to reset password page
      } else {
        setMessage(data.message || 'Wrong OTP! Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error verifying OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Forgot Password</h2>
        
        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-black placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-black placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}
        
        {message && (
          <div className="mt-4 text-center text-green-500">
            {message}
          </div>
        )}
        
        <p className="mt-6 text-center text-purple-200">
          Remembered your password?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
