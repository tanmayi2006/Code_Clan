import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Set alert message and redirect to home page
        setAlertMessage('Login successful!');
        setTimeout(() => {
          navigate('/home');
        }, 2000); // Redirect after 2 seconds
      } else {
        // Set error message for wrong credentials
        setErrorMessage('Wrong credentials! Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1A] to-[#0D152C] flex items-center justify-center p-4">
      <div className="bg-[#0D1729] backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#28D3D1] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1729] border border-[#28D3D1]/30 text-[#28D3D1] placeholder-[#28D3D1]/70 focus:outline-none focus:ring-2 focus:ring-[#28D3D1]"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#28D3D1] mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1729] border border-[#28D3D1]/30 text-[#28D3D1] placeholder-[#28D3D1]/70 focus:outline-none focus:ring-2 focus:ring-[#28D3D1]"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#28D3D1] hover:bg-[#0D152C] text-[#0A0A1A] font-semibold rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
        
        {alertMessage && (
          <div className="mt-4 text-center text-[#28D3D1]">
            {alertMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mt-4 text-center text-[#28D3D1]">
            {errorMessage}
          </div>
        )}
        
        <p className="mt-6 text-center text-[#28D3D1]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#28D3D1] hover:text-[#28D3D1] font-semibold">
            Sign up
          </Link>
        </p>
        
        <p className="mt-6 text-center text-[#28D3D1]">
          <Link to="/forgot-password" className="text-[#28D3D1] hover:text-[#28D3D1] font-semibold">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
