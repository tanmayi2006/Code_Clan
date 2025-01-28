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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1A] to-[#0D152C] flex items-center justify-center p-4">
      <div className="bg-[#0D1729] backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6 text-center">Forgot Password</h2>
        
        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#28D3D1] mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-[#0D1729] border border-[#28D3D1]/30 text-[#28D3D1] placeholder-[#28D3D1]/70 focus:outline-none focus:ring-2 focus:ring-[#28D3D1]"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#28D3D1] hover:bg-[#0D152C] text-[#0A0A1A] font-semibold rounded-lg transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#28D3D1] mb-1">OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-[#0D1729] border border-[#28D3D1]/30 text-[#28D3D1] placeholder-[#28D3D1]/70 focus:outline-none focus:ring-2 focus:ring-[#28D3D1]"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#28D3D1] hover:bg-[#0D152C] text-[#0A0A1A] font-semibold rounded-lg transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}
        
        {message && (
          <div className="mt-4 text-center text-[#28D3D1]">
            {message}
          </div>
        )}
        
        <p className="mt-6 text-center text-[#28D3D1]">
          Remembered your password?{' '}
          <Link to="/login" className="text-[#28D3D1] hover:text-[#0A0A1A] font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
