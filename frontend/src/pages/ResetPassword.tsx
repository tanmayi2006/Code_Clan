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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-black placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>
        
        {message && (
          <div className="mt-4 text-center text-green-500">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
