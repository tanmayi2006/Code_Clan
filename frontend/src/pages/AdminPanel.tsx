import React, { useState } from 'react';
import { Bell, Calendar, Send } from 'lucide-react';

const AdminPanel = () => {
  const [notification, setNotification] = useState('');
  const [eventDetails, setEventDetails] = useState({
    name: '',
    type: '',
    time: '',
    date: '',
    thumbnail: null as File | null,
  });

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your notification service
    alert('Notification sent to all web users!');
    setNotification('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1A] via-[#0D152C] to-[#0D1729] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notifications Section */}
        <div className="backdrop-blur-xl bg-[#0D152C]/40 p-8 rounded-2xl shadow-2xl border border-[#28D3D1]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-[#28D3D1]" />
              <h2 className="text-xl font-bold text-white">Send Notification</h2>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-4">
              <textarea
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                className="w-full h-32 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors resize-none"
                placeholder="Type your notification message here..."
                required
              />

              <button 
                type="submit"
                className="flex items-center gap-2 bg-[#28D3D1] text-[#0A0A1A] font-bold py-2 px-4 rounded-lg hover:bg-[#28D3D1]/90 transition-colors duration-200 relative overflow-hidden group"
              >
                <Send className="w-4 h-4" />
                <span className="relative z-10">Send Notification</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-500 ease-in-out transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Calendar Management Section */}
        <div className="backdrop-blur-xl bg-[#0D152C]/40 p-8 rounded-2xl shadow-2xl border border-[#28D3D1]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#28D3D1]" />
              <h2 className="text-xl font-bold text-white">Calendar Management</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-[#28D3D1] mb-2">Event Name</label>
                <input
                  type="text"
                  value={eventDetails.name}
                  onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                  className="w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                  placeholder="Event name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#28D3D1] mb-2">Type of Show</label>
                <select
                  value={eventDetails.type}
                  onChange={(e) => setEventDetails({ ...eventDetails, type: e.target.value })}
                  className="w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                  required
                >
                  <option value="">Select type</option>
                  <option value="podcast">Podcast</option>
                  <option value="music">Music</option>
                  <option value="story">Story</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#28D3D1] mb-2">Time</label>
                  <input
                    type="time"
                    value={eventDetails.time}
                    onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                    className="w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#28D3D1] mb-2">Date</label>
                  <input
                    type="date"
                    value={eventDetails.date}
                    onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                    className="w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#28D3D1] mb-2">Thumbnail</label>
                <input
                  type="file"
                  onChange={(e) => setEventDetails({ ...eventDetails, thumbnail: e.target.files?.[0] || null })}
                  className="w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#28D3D1] file:text-[#0A0A1A] hover:file:bg-[#28D3D1]/90"
                  accept="image/*"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#28D3D1] text-[#0A0A1A] font-bold py-3 px-6 rounded-lg hover:bg-[#28D3D1]/90 transition-colors duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10">Save Event</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-500 ease-in-out transition-transform" />
                </button>

                <button
                  type="button"
                  className="flex-1 bg-[#0A0A1A] text-[#28D3D1] font-bold py-3 px-6 rounded-lg border border-[#28D3D1] hover:bg-[#28D3D1]/10 transition-colors duration-200"
                >
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;