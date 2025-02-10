import React, { useState } from 'react';
import { Bell, Calendar, Send, Loader2 } from 'lucide-react';

const AdminPanel = () => {
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: '',
    type: '',
    time: '',
    date: '',
    thumbnail: null,
  });

  const handleSendNotification = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (!notification.trim()) {
      return alert('Please enter a notification message.');
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: notification }), // ✅ Send user-inputted notification
      });

      const data = await response.json();
      if (data.success) {
        alert("Notification sent successfully!");
        setNotification(""); // Clear input after success
      } else {
        alert("Failed to send notification: " + data.error);
      }
    } catch (error) {
      alert("Error sending notification. Please try again.");
      console.error("Error sending notification:", error);
    }

    setLoading(false);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!eventDetails.name || !eventDetails.type || !eventDetails.time || !eventDetails.date || !eventDetails.thumbnail) {
      return alert('Please fill in all fields.');
    }

    setLoading(true);
    const formData = new FormData();
    Object.keys(eventDetails).forEach((key) => {
      formData.append(key, eventDetails[key]);
    });

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
        alert(data.error || 'Failed to add event');
      }
    } catch (error) {
      alert('Error adding event. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0A0A1A] via-[#0D152C] to-[#0D1729]">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Notification Section */}
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
            <button
              type="submit"
              className="px-4 py-2 bg-[#28D3D1] text-[#0A0A1A] font-bold rounded-lg hover:bg-[#28D3D1]/90 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
              {loading ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </div>

        {/* Calendar Management Section */}
        <div className="p-8 bg-[#0D152C]/40 rounded-2xl shadow-2xl border border-[#28D3D1]/10">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#28D3D1]" />
            <h2 className="text-xl font-bold text-white">Calendar Management</h2>
          </div>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              value={eventDetails.name}
              onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
              className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white"
              placeholder="Event name"
              required
            />
            <select
              value={eventDetails.type}
              onChange={(e) => setEventDetails({ ...eventDetails, type: e.target.value })}
              className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white"
              required
            >
              <option value="">Select type</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music</option>
              <option value="story">Story</option>
            </select>
            <input
              type="time"
              value={eventDetails.time}
              onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
              className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white"
              required
            />
            <input
              type="date"
              value={eventDetails.date}
              onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
              className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white"
              required
            />
            <input
              type="file"
              onChange={(e) => setEventDetails({ ...eventDetails, thumbnail: e.target.files?.[0] || null })}
              className="w-full p-3 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg text-white"
              accept="image/*"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#28D3D1] text-[#0A0A1A] font-bold rounded-lg hover:bg-[#28D3D1]/90 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
              {loading ? 'Saving...' : 'Save Event'}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPanel;
