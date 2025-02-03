import React, { useState } from 'react';
import { Radio, Clock, Music, Mic2, Calendar, Newspaper } from 'lucide-react';

const Preferences = () => {
  const [selectedShows, setSelectedShows] = useState<string[]>([]);
  const [listeningFrequency, setListeningFrequency] = useState('');
  const [listeningTime, setListeningTime] = useState('');

  const showTypes = [
    { id: 'alumni', label: 'Alumni Shows', icon: <Mic2 className="w-5 h-5" /> },
    { id: 'storytelling', label: 'Storytelling', icon: <Radio className="w-5 h-5" /> },
    { id: 'music', label: 'Music', icon: <Music className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
  ];

  const handleShowToggle = (showId: string) => {
    setSelectedShows(prev =>
      prev.includes(showId)
        ? prev.filter(id => id !== showId)
        : [...prev, showId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      selectedShows,
      listeningFrequency,
      listeningTime,
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A1A] py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Logo Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="animate-float inline-block">
          <Radio className="w-32 h-32 text-[#28D3D1] animate-pulse" />
        </div>
        <h1 className="mt-8 text-4xl font-bold text-[#28D3D1] tracking-tight">
          Personalize Your Experience
        </h1>
        <p className="mt-4 text-xl text-[#28D3D1]/80">
          Tell us what you love, and we'll create the perfect radio experience for you
        </p>
      </div>

      {/* Preferences Form */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12 bg-[#0D152C] p-8 rounded-2xl shadow-xl shadow-[#28D3D1]/10">
          {/* Show Types */}
          <div>
            <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6">What kind of shows interest you?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {showTypes.map(show => (
                <button
                  key={show.id}
                  type="button"
                  onClick={() => handleShowToggle(show.id)}
                  className={`p-4 rounded-xl flex items-center space-x-3 transition-all duration-300 ${
                    selectedShows.includes(show.id)
                      ? 'bg-[#28D3D1] text-[#0A0A1A]'
                      : 'bg-[#0D1729] text-[#28D3D1] hover:bg-[#28D3D1]/20'
                  }`}
                >
                  {show.icon}
                  <span>{show.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Listening Frequency */}
          <div>
            <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6">How often do you listen?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Daily', 'Few times a week', 'Occasionally'].map(frequency => (
                <button
                  key={frequency}
                  type="button"
                  onClick={() => setListeningFrequency(frequency)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    listeningFrequency === frequency
                      ? 'bg-[#28D3D1] text-[#0A0A1A]'
                      : 'bg-[#0D1729] text-[#28D3D1] hover:bg-[#28D3D1]/20'
                  }`}
                >
                  {frequency}
                </button>
              ))}
            </div>
          </div>

          {/* Listening Time */}
          <div>
            <h2 className="text-2xl font-semibold text-[#28D3D1] mb-6">
              How much time do you usually spend listening?
            </h2>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#28D3D1]" />
              <input
                type="text"
                value={listeningTime}
                onChange={(e) => setListeningTime(e.target.value)}
                placeholder="e.g., 2 hours per day"
                className="w-full p-4 pl-12 rounded-xl bg-[#0D1729] text-[#28D3D1] placeholder-[#28D3D1]/50 border border-[#28D3D1]/20 focus:border-[#28D3D1] focus:ring-1 focus:ring-[#28D3D1] transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#28D3D1] to-[#28D3D1]/80 text-[#0A0A1A] font-semibold hover:from-[#28D3D1]/90 hover:to-[#28D3D1]/70 transition-all duration-300 shadow-lg shadow-[#28D3D1]/20 transform hover:scale-[1.02]"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;