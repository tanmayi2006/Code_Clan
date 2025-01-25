import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle password reset email logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Radio className="w-12 h-12 text-purple-300" />
          <h1 className="text-3xl font-bold text-white ml-2">College Radio</h1>
        </div>
        
        {!submitted ? (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Reset Password</h2>
            <p className="text-purple-200 text-center mb-6">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-white placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Send Reset Instructions
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Check Your Email</h2>
            <p className="text-purple-200 mb-6">
              We've sent password reset instructions to your email address.
            </p>
          </div>
        )}
        
        <div className="mt-6">
          <Link
            to="/login"
            className="flex items-center justify-center text-purple-300 hover:text-purple-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;