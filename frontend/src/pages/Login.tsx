import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Radio className="w-12 h-12 text-purple-300" />
          <h1 className="text-3xl font-bold text-white ml-2">College Radio</h1>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-white placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-white placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-300 hover:text-purple-200"
            >
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-purple-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;