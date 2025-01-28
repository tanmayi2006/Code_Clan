import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset successfully.');
      } else {
        setMessage(data.message || 'Error resetting password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1A] to-[#0D152C] flex items-center justify-center p-4">
      <div className="bg-[#0D1729] backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6 text-center">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#28D3D1] mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1729] border border-[#28D3D1]/30 text-[#28D3D1] placeholder-[#28D3D1]/70 focus:outline-none focus:ring-2 focus:ring-[#28D3D1]"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#28D3D1] hover:bg-[#0D152C] text-[#0A0A1A] font-semibold rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>
        
        {message && (
          <div className="mt-4 text-center text-[#28D3D1]">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
