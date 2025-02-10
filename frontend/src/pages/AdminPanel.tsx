import React, { useState } from 'react';
import { Bell, Calendar, Send } from 'lucide-react';

const AdminPanel = () => {
  const [notification, setNotification] = useState('');
  const [eventDetails, setEventDetails] = useState({
    name: '',
    type: '',
    time: '',
    date: '',
    thumbnail: null,
  });

  const handleSendNotification = (e) => {
    e.preventDefault();
    alert('Notification sent to all web users!');
    setNotification('');
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', eventDetails.name);
    formData.append('type', eventDetails.type);
    formData.append('time', eventDetails.time);
    formData.append('date', eventDetails.date);
    if (eventDetails.thumbnail) {
      formData.append('thumbnail', eventDetails.thumbnail);
    }

    try {
      const response = await fetch('http://localhost:5000/api/addEvent', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Event added successfully!');
        setEventDetails({ name: '', type: '', time: '', date: '', thumbnail: null });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to add event');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0A0A1A] via-[#0D152C] to-[#0D1729]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-8 bg-[#0D152C]/40 rounded-2xl shadow-2xl border border-[#28D3D1]/10">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#28D3D1]" />
            <h2 className="text-xl font-bold text-white">Send Notification</h2>
          </div>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <textarea
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              className="w-full h-32 p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white resize-none"
              placeholder="Type your notification message here..."
              required
            />
            <button type="submit" className="px-4 py-2 bg-[#28D3D1] text-[#0A0A1A] font-bold rounded-lg hover:bg-[#28D3D1]/90">
              <Send className="w-4 h-4" /> Send Notification
            </button>
          </form>
        </div>

        <div className="p-8 bg-[#0D152C]/40 rounded-2xl shadow-2xl border border-[#28D3D1]/10">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#28D3D1]" />
            <h2 className="text-xl font-bold text-white">Calendar Management</h2>
          </div>
          <form onSubmit={handleAddEvent} className="space-y-4"> {/* Added onSubmit here */}
            <input type="text" value={eventDetails.name} onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })} className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white" placeholder="Event name" required />
            <select value={eventDetails.type} onChange={(e) => setEventDetails({ ...eventDetails, type: e.target.value })} className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white" required>
              <option value="">Select type</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music</option>
              <option value="story">Story</option>
            </select>
            <input type="time" value={eventDetails.time} onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })} className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white" required />
            <input type="date" value={eventDetails.date} onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })} className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white" required />
            <input type="file" onChange={(e) => setEventDetails({ ...eventDetails, thumbnail: e.target.files?.[0] || null })} className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white" accept="image/*" required />
            <button type="submit" className="px-6 py-3 bg-[#28D3D1] text-[#0A0A1A] font-bold rounded-lg hover:bg-[#28D3D1]/90">Save Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
