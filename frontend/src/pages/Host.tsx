import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Mic,
  MicOff,
  Users,
  MessageSquare,
  UserPlus,
  Power,
  Music,
  X,
} from 'lucide-react';

const HostDashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPowerOn, setPowerOn] = useState(true);
  const [message, setMessage] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [activeParticipants, setActiveParticipants] = useState([
    { id: 1, user: 'Emma', isSpeaking: true, profilePic: '/api/placeholder/32/32' },
    { id: 2, user: 'Mike', isSpeaking: false, profilePic: '/api/placeholder/32/32' },
  ]);
  const [comments, setComments] = useState([
    { id: 1, user: 'Alex', text: 'Great show today!', profilePic: '/api/placeholder/24/24' },
    { id: 2, user: 'Sarah', text: 'Can you play some jazz?', profilePic: '/api/placeholder/24/24' },
  ]);
  const [requests, setRequests] = useState([
    { id: 1, user: 'Mike', profilePic: '/api/placeholder/32/32' },
    { id: 2, user: 'Emma', profilePic: '/api/placeholder/32/32' },
  ]);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const toggleParticipantAudio = (id) => {
    setActiveParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isSpeaking: !p.isSpeaking } : p
      )
    );
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic
      console.log('Recording started...');
    } else {
      // Stop recording logic
      console.log('Recording stopped...');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Main Controls */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 space-y-6">
          <div className="flex items-start space-x-6">
            {/* Radio Thumbnail */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-teal-500 to-blue-500">
                <img
                  src="/api/placeholder/128/128"
                  alt="Radio Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">College Radio Live</h1>
                <button
                  onClick={() => setPowerOn(!isPowerOn)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isPowerOn
                      ? 'bg-teal-500/20 text-teal-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  <Power className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleStartRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isRecording
                      ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500'
                  }`}
                >
                  {isRecording ? (
                    <Mic className="w-8 h-8 text-white" />
                  ) : (
                    <MicOff className="w-8 h-8 text-white" />
                  )}
                </button>
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-medium">247</span>
                </div>
                {/* Audio Upload */}
                <label className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors">
                  <Music className="w-4 h-4 text-teal-400" />
                  <span className="text-white text-sm">Add Audio</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Active Participants */}
          <div className="flex flex-wrap gap-4">
            {activeParticipants.map((participant) => (
              <div
                key={participant.id}
                className="bg-gray-800 rounded-xl p-3 flex items-center space-x-3"
              >
                <div className="relative">
                  <img
                    src={participant.profilePic}
                    alt={participant.user}
                    className="w-10 h-10 rounded-full"
                  />
                  {participant.isSpeaking && (
                    <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-[ping_1.5s_ease-in-out_infinite]" />
                  )}
                </div>
                <span className="text-white font-medium">{participant.user}</span>
                <button
                  onClick={() => toggleParticipantAudio(participant.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    participant.isSpeaking
                      ? 'bg-teal-500/20 text-teal-500'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {participant.isSpeaking ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    setActiveParticipants((prev) =>
                      prev.filter((p) => p.id !== participant.id)
                    )
                  }
                  className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Requests */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <UserPlus className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Join Requests</h2>
          </div>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-800 rounded-xl p-4 transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={request.profilePic}
                    alt={request.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white font-medium flex-1">{request.user}</span>
                  <button
                    onClick={() => {
                      setActiveParticipants((prev) => [
                        ...prev,
                        { ...request, isSpeaking: false },
                      ]);
                      setRequests((prev) =>
                        prev.filter((r) => r.id !== request.id)
                      );
                    }}
                    className="px-3 py-1 bg-teal-500 hover:bg-teal-400 rounded-lg text-white text-sm transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      setRequests((prev) => prev.filter((r) => r.id !== request.id))
                    }
                    className="px-3 py-1 bg-red-500 hover:bg-red-400 rounded-lg text-white text-sm transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Streamlined Comments */}
        <div className="lg:col-span-3 bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-teal-400" />
              <h2 className="text-xl font-bold text-white">Live Comments</h2>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Broadcast a message..."
              className="flex-1 max-w-md bg-gray-800 text-white rounded-lg px-4 py-2 ml-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="overflow-hidden max-h-60 relative bg-gray-800 p-4 rounded-xl">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                >
                  <img
                    src={comment.profilePic}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white text-sm font-medium">
                    {comment.user}
                  </span>
                  <p className="text-gray-400 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
