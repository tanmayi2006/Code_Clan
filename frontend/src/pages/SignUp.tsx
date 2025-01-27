import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Set alert message and redirect to login page
        setAlertMessage('Sign up successful! Please log in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else if (data.message === 'User already exists') {
        // Set error message for existing email
        setErrorMessage('Email already exists');
      } else {
        // Handle other errors
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-black placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300/30 text-black placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
        
        {alertMessage && (
          <div className="mt-4 text-center text-green-500">
            {alertMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mt-4 text-center text-red-500">
            {errorMessage}
          </div>
        )}
        
        <p className="mt-6 text-center text-purple-200">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
