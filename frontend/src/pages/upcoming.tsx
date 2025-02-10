import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const Upcoming = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/getEvents") // Fetch from MongoDB API
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Events:", data);
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
    setCurrentDate(new Date(currentDate.setMonth(event.target.value)));
  };

  const handleYearChange = (event) => {
    setCurrentDate(new Date(currentDate.setFullYear(event.target.value)));
  };

  const getEventsForDate = (day) => {
    const formattedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0]; 

    return events.filter((event) => event.date.split("T")[0] === formattedDate);
  };

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-[#28D3D1] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            Event Calendar
          </h2>
        </div>

        {/* Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-[#0D152C] rounded-2xl p-6 shadow-[0_0_15px_rgba(40,211,209,0.1)] backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <select
                  value={currentDate.getMonth()}
                  onChange={handleMonthChange}
                  className="bg-[#0D1729] border border-[#28D3D1]/20 rounded-lg px-3 py-1 text-sm focus:outline-none"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="bg-[#0D1729] border border-[#28D3D1]/20 rounded-lg px-3 py-1 text-sm focus:outline-none"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                    )
                  }
                  className="p-2 hover:bg-[#0D1729] rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                    )
                  }
                  className="p-2 hover:bg-[#0D1729] rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-2">
                  {day}
                </div>
              ))}

              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDate(day);
                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1 relative ${
                      dayEvents.length > 0
                        ? "cursor-pointer bg-[#28D3D1]/20 hover:bg-[#28D3D1]/30 rounded-lg"
                        : ""
                    }`}
                    onClick={() =>
                      dayEvents.length > 0 && setSelectedEvent(dayEvents[0])
                    }
                  >
                    <div className="h-full w-full flex flex-col items-center">
                      <span className="text-sm mb-1">{day}</span>
                      {dayEvents.map((event) => (
                        <div
                          key={event._id}
                          className="text-xs p-1 bg-[#28D3D1]/10 rounded mb-1 truncate"
                          title={event.name}
                        >
                          {event.name}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Details Section */}
          <div className="bg-[#0D152C] rounded-2xl p-6 shadow-[0_0_15px_rgba(40,211,209,0.1)] backdrop-blur-sm">
            {selectedEvent ? (
              <div>
                {/* Event Thumbnail Image */}
                {selectedEvent.image ? (
                  <img
                    src={selectedEvent.image}
                    alt="Event Thumbnail"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <p className="text-gray-500 text-sm mb-4">No Image Available</p>
                )}

                <h3 className="text-xl font-semibold text-[#28D3D1]">
                  {selectedEvent.name}
                </h3>
                <p className="text-sm mt-2">{selectedEvent.description || "No description available"}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(selectedEvent.date).toDateString()} |{" "}
                  {selectedEvent.time}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Click on a highlighted date to view event details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
