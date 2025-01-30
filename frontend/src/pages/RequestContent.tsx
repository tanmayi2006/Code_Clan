import React, { useState } from "react";
import { Radio } from "lucide-react";

const RequestContent = () => {
  const [isEvent, setIsEvent] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-[#0A0A1A]">
      <div className="max-w-2xl w-full">
        <div className="relative backdrop-blur-xl bg-[#0D152C]/40 p-8 rounded-2xl shadow-xl border border-[#28D3D1]/20 overflow-hidden">
          {/* Glossy Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <Radio className="w-8 h-8 text-[#28D3D1]" />
              <h1 className="text-2xl font-bold text-white">
                Request Content Broadcasting
              </h1>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">Name</label>
                  <input
                    type="text"
                    className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] focus-visible:ring transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">Email</label>
                  <input
                    type="email"
                    className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] focus-visible:ring transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] focus-visible:ring transition-colors"
                    placeholder="Your contact number"
                    required
                  />
                </div>

                {/* Type of Show Selection */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">Type of Show</label>
                  <select
                    className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] focus-visible:ring transition-colors"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="podcast">Podcast</option>
                    <option value="music">Music</option>
                    <option value="story">Story</option>
                  </select>
                </div>

                {/* Event Related Selection */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">Is it related to an event?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isEvent"
                        checked={isEvent}
                        onChange={() => setIsEvent(true)}
                        className="accent-[#28D3D1] peer hidden"
                      />
                      <span className="w-5 h-5 flex justify-center items-center border-2 border-[#28D3D1] rounded-full peer-checked:bg-[#28D3D1]" />
                      <span className="text-white">Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isEvent"
                        checked={!isEvent}
                        onChange={() => setIsEvent(false)}
                        className="accent-[#28D3D1] peer hidden"
                      />
                      <span className="w-5 h-5 flex justify-center items-center border-2 border-[#28D3D1] rounded-full peer-checked:bg-[#28D3D1]" />
                      <span className="text-white">No</span>
                    </label>
                  </div>
                </div>

                {/* Event Details */}
                {isEvent && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#28D3D1] mb-2">Event Name</label>
                      <input
                        type="text"
                        className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                        placeholder="Event name"
                        required={isEvent}
                      />
                    </div>
                    <div>
                      <label className="block text-[#28D3D1] mb-2">Event Date</label>
                      <input
                        type="date"
                        className="peer w-full bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors"
                        required={isEvent}
                      />
                    </div>
                  </div>
                )}

                {/* Suggestions Textarea */}
                <div>
                  <label className="block text-[#28D3D1] mb-2">
                    Suggestions (Optional)
                    <span className="text-[#28D3D1]/60 text-sm ml-2">
                      Share your ideas or preferences
                    </span>
                  </label>
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full h-32 bg-[#0A0A1A]/50 border border-[#28D3D1]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#28D3D1] transition-colors resize-none"
                    placeholder="Any suggestions for your content or the show..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#28D3D1] text-[#0A0A1A] font-bold py-3 px-6 rounded-lg hover:bg-[#28D3D1]/90 transition-colors duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10">Submit Request</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full motion-safe:transition-transform duration-500 ease-in-out" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContent;