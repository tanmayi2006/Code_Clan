import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';

// Mock data for shows - in a real app, this would come from an API/database
const shows = [
  {
    id: 1,
    title: "Electronic Waves",
    host: "DJ Pulse",
    date: "2025-03-20",
    time: "20:00-22:00",
    description: "Journey through the latest electronic music trends with DJ Pulse.",
    genre: "Electronic",
  },
  {
    id: 2,
    title: "Jazz Chronicles",
    host: "Sarah Miles",
    date: "2025-03-22",
    time: "18:00-20:00",
    description: "Exploring the rich history of jazz with carefully curated selections.",
    genre: "Jazz",
  },
  {
    id: 3,
    title: "Indie Underground",
    host: "Alex Rivers",
    date: "2025-03-21",
    time: "19:00-21:00",
    description: "Discover emerging indie artists and underground hits before they break into the mainstream.",
    genre: "Indie Rock",
  },
  {
    id: 4,
    title: "Classical Journey",
    host: "Dr. Maria Chen",
    date: "2025-03-23",
    time: "16:00-18:00",
    description: "A sophisticated exploration of classical masterpieces from baroque to contemporary.",
    genre: "Classical",
  },
  {
    id: 5,
    title: "Hip-Hop Evolution",
    host: "MC Storm",
    date: "2025-03-24",
    time: "22:00-00:00",
    description: "Tracking the evolution of hip-hop from its roots to modern trends.",
    genre: "Hip-Hop",
  },
  {
    id: 6,
    title: "Global Beats",
    host: "Maya Santos",
    date: "2025-03-25",
    time: "17:00-19:00",
    description: "World music fusion bringing together traditional and modern sounds from across the globe.",
    genre: "World Music",
  },
  {
    id: 7,
    title: "Metal Mayhem",
    host: "Thor Anderson",
    date: "2025-03-26",
    time: "21:00-23:00",
    description: "Heavy riffs and powerful vocals from the best metal bands around the world.",
    genre: "Metal",
  },
  {
    id: 8,
    title: "Ambient Space",
    host: "Luna Wright",
    date: "2025-03-27",
    time: "23:00-01:00",
    description: "Late-night ambient soundscapes for relaxation and deep listening.",
    genre: "Ambient",
  },
  {
    id: 9,
    title: "Soul Sessions",
    host: "James Wilson",
    date: "2025-03-28",
    time: "19:00-21:00",
    description: "Classic soul and R&B hits that defined generations.",
    genre: "Soul/R&B",
  },
  {
    id: 10,
    title: "Synthwave Nights",
    host: "Neon Kate",
    date: "2025-03-29",
    time: "22:00-00:00",
    description: "Retro-futuristic beats and atmospheric synthwave productions.",
    genre: "Synthwave",
  }
];

const upcoming = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedShow, setSelectedShow] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleMonthChange = (event) => {
    const newDate = new Date(currentDate.setMonth(event.target.value));
    setCurrentDate(newDate);
  };

  const handleYearChange = (event) => {
    const newDate = new Date(currentDate.setFullYear(event.target.value));
    setCurrentDate(newDate);
  };

  const getShowsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return shows.filter(show => show.date === dateStr);
  };

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-[#28D3D1] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            Show Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0D152C] rounded-2xl p-6 shadow-[0_0_15px_rgba(40,211,209,0.1)] backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <select
                  value={currentDate.getMonth()}
                  onChange={handleMonthChange}
                  className="bg-[#0D1729] border border-[#28D3D1]/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-[#28D3D1]/50"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
                <select
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="bg-[#0D1729] border border-[#28D3D1]/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-[#28D3D1]/50"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                  className="p-2 hover:bg-[#0D1729] rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                  className="p-2 hover:bg-[#0D1729] rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-2">
                  {day}
                </div>
              ))}
              
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}
              
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const dayShows = getShowsForDate(day);
                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1 relative ${
                      dayShows.length > 0
                        ? 'cursor-pointer hover:bg-[#0D1729] rounded-lg transition-all duration-300'
                        : ''
                    }`}
                    onClick={() => dayShows.length > 0 && setSelectedShow(dayShows[0])}
                  >
                    <div className="h-full w-full flex flex-col">
                      <span className="text-sm mb-1">{day}</span>
                      {dayShows.map((show) => (
                        <div
                          key={show.id}
                          className="text-xs p-1 bg-[#28D3D1]/10 rounded mb-1 truncate"
                          title={show.title}
                        >
                          {show.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0D152C] rounded-2xl p-6 shadow-[0_0_15px_rgba(40,211,209,0.1)] backdrop-blur-sm">
            {selectedShow ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{selectedShow.title}</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span className="text-sm opacity-80">Show Details</span>
                  </p>
                  <div className="space-y-3 text-sm">
                    <p><span className="opacity-70">Host:</span> {selectedShow.host}</p>
                    <p><span className="opacity-70">Date:</span> {new Date(selectedShow.date).toLocaleDateString()}</p>
                    <p><span className="opacity-70">Time:</span> {selectedShow.time}</p>
                    <p><span className="opacity-70">Genre:</span> {selectedShow.genre}</p>
                    <p className="opacity-70 mt-4">{selectedShow.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center opacity-70">
                <p>Select a show from the calendar to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default upcoming;