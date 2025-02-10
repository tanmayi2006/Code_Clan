import React, { useState, useEffect } from 'react';
import { Home, Clock, FileText, Calendar, Radio, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications'); // Adjust URL as needed
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      console.log(data)
      // Always display the latest notification on top
      setNotifications(data.reverse());  
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Toggle notification dropdown
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      fetchNotifications(); // Ensure fresh data is loaded every time
    }
  };

  return (
    <header className="bg-[#0D162B] /20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and site name */}
          <div className="flex items-center space-x-4 text-[#28D3D1]">
            <Radio size={40} className="text-[#28D3D1]" />
            <h1 className="text-3xl font-bold text-[#28D3D1]">College Radio</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/upcoming" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <Calendar size={20} />
              <span>Upcoming Shows</span>
            </Link>
            <Link to="/past" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <Clock size={20} />
              <span>Past Shows</span>
            </Link>
            <Link to="/request" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
              <FileText size={20} />
              <span>Request Content</span>
            </Link>
          </nav>

          {/* Notification Bell */}
          <div className="relative">
            <button onClick={toggleNotifications} className="text-[#28D3D1] relative">
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                <div className="p-4 border-b font-semibold text-[#0D162B]">Notifications</div>
                <ul className="max-h-64 overflow-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="p-3 text-sm border-b hover:bg-gray-100">
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-sm text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#28D3D1]">
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
              <Link to="/upcoming" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <Calendar size={20} />
                <span>Upcoming Shows</span>
              </Link>
              <Link to="/past" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <Clock size={20} />
                <span>Past Shows</span>
              </Link>
              <Link to="/request" className="flex items-center space-x-2 text-[#28D3D1] hover:text-[#28D3D1]/80 transition-colors">
                <FileText size={20} />
                <span>Request Content</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
