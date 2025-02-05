import React from 'react';
import { Mail, Phone, MapPin,Radio } from 'lucide-react';
import Logo from '../assets/Logo.png';


const Footer = () => {
  return (
    <footer className="bg-[#0D152C] text-[#28D3D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            {/* <img src={Logo} alt="College Radio Logo" className="w-15 h-11" /> */}
            <Radio size={40} className="text-[#28D3D1]" />
            <h1 className="text-3xl font-bold text-[#28D3D1]">College Radio</h1>
            <p className="text-[#28D3D1]/80">
              Broadcasting the best college content 24/7. Your voice, your station, your community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="hover:text-[#28D3D1]/80 transition-colors">Home</a></li>
              <li><a href="/past" className="hover:text-[#28D3D1]/80 transition-colors">Past Shows</a></li>
              <li><a href="/request" className="hover:text-[#28D3D1]/80 transition-colors">Request Content</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>radio@college.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Student Center, Room 201</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0D1729] flex items-center justify-center hover:bg-[#28D3D1]/20 transition-colors">
                {/* Social media icons */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#28D3D1]/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} College Radio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
