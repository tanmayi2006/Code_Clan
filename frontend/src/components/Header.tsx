import React, { useState } from 'react';
import { Home, Clock, FileText, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0A0A1A] border-b border-[#28D3D1]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and site name */}
          <div className="flex items-center space-x-4">
            <img src="./assets/Logo.png" alt="College Radio Logo" className="w-10 h-10" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/past" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <Clock size={20} />
              <span>Past Shows</span>
            </Link>
            <Link to="/request" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <FileText size={20} />
              <span>Request Content</span>
            </Link>
            <Link to="/login" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#28D3D1] to-[#28D3D1]/80 text-[#0A0A1A] hover:from-[#28D3D1]/90 hover:to-[#28D3D1]/70 transition-all duration-300 shadow-lg shadow-[#28D3D1]/20">
              <LogIn size={20} />
              <span>Sign In</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#28D3D1]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/home" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/past" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <Clock size={20} />
                <span>Past Shows</span>
              </Link>
              <Link to="/request" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <FileText size={20} />
                <span>Request Content</span>
              </Link>
              <Link to="/login" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#28D3D1] to-[#28D3D1]/80 text-[#0A0A1A] hover:from-[#28D3D1]/90 hover:to-[#28D3D1]/70 transition-all duration-300 shadow-lg shadow-[#28D3D1]/20">
                <LogIn size={20} />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
