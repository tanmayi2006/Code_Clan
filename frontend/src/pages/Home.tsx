import React, { useState } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Users, 
  ChevronDown,
  Send,
  AudioWaveform as Waveform,
  X,
  MessageSquare,
  Plus,
  UserPlus,
  ChevronRight,
  Clock
} from 'lucide-react';

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('Main Channel');
  const [listeners, setListeners] = useState(342);
  const [showChannels, setShowChannels] = useState(false);
  const [comment, setComment] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [customChannel, setCustomChannel] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(false);
  const [joinRequestMessage, setJoinRequestMessage] = useState('');

  const channels = [
    { name: 'Main Channel', frequency: '98.5' },
    { name: 'Jazz Radio', frequency: '101.3' },
    { name: 'Campus News', frequency: '95.7' },
    { name: 'Late Night', frequency: '103.1' }
  ];

  const comments = [
    { user: 'Alex', text: 'Loving this track! 🎵', time: '2m ago' },
    { user: 'Sarah', text: 'Great show today!', time: '5m ago' },
    { user: 'Mike', text: 'Can you play some jazz?', time: '10m ago' }
  ];

  const transcriptLines = [
    { time: '00:12', text: 'Welcome back to College Radio!' },
    { time: '00:15', text: "We're playing the latest indie tracks" },
    { time: '00:20', text: 'Coming up next: an exclusive interview' }
  ];

  const pastShows = [
    {
      id: 1,
      title: "Late Night Jazz",
      host: "Sarah Williams",
      date: "March 15, 2024",
      duration: "2h 15m",
      thumbnail: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=400",
      listeners: 1243
    },
    {
      id: 2,
      title: "Morning Classical",
      host: "David Chen",
      date: "March 14, 2024",
      duration: "1h 45m",
      thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=400",
      listeners: 892
    },
    {
      id: 3,
      title: "Indie Spotlight",
      host: "Alex Thompson",
      date: "March 13, 2024",
      duration: "2h",
      thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=400",
      listeners: 1567
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-white overflow-x-hidden">
      <section className="min-h-screen relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8 relative">
          <div className={`flex transition-all duration-500 ${showTranscript ? 'gap-8' : 'justify-center'}`}>
            {/* Main Content */}
            <div className={`transition-all duration-500 ${showTranscript ? 'w-1/2' : 'w-full max-w-2xl'}`}>
              <div className="flex flex-col items-center gap-8">
                {/* Retro Radio */}
                <div className={`relative transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
                  <div className="relative transform-style-3d">
                    <div className="relative perspective-1000">
                      <div className={`transform rotate-y-[-20deg] rotate-x-[10deg] transition-transform duration-500 ${isPlaying ? 'rotate-y-[-30deg]' : ''}`}>
                        <Radio 
                          size={160} 
                          className={`transition-all duration-500 ${isPlaying ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-gray-400'}`}
                          style={{
                            filter: isPlaying ? 'drop-shadow(0 0 10px rgba(34,211,238,0.3))' : 'none',
                          }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-xl transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    </div>
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${isPlaying ? 'bg-cyan-500 animate-ping' : 'bg-gray-500'}`} />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${isPlaying ? 'bg-cyan-400' : 'bg-gray-500'}`} />
                  </div>
                  {isPlaying && (
                    <div className="absolute -inset-8 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
                  )}
                </div>

                <div className="text-center">
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
                    College Radio
                  </h1>
                  <p className="text-gray-400 text-xl mt-2 mb-6">Broadcasting live from campus</p>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 px-12 py-4 rounded-full hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 flex items-center gap-3 font-medium shadow-[0_0_25px_rgba(0,255,255,0.3)] mx-auto text-lg"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    {isPlaying ? 'Stop' : 'Play'}
                  </button>
                  {/* Listeners Count */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Users size={16} className="text-cyan-400" />
                    <span className="text-sm text-gray-400">{listeners} listening</span>
                    <button
                      onClick={() => setShowJoinRequest(!showJoinRequest)}
                      className="ml-4 px-3 py-1 rounded-full text-sm bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-500/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <UserPlus size={14} />
                      Join as Host
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] w-full">
                  {/* Join Request Form */}
                  {showJoinRequest && (
                    <div className="mb-6 bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-medium mb-3 text-cyan-400">Request to Join as Radio Host</h3>
                      <textarea
                        value={joinRequestMessage}
                        onChange={(e) => setJoinRequestMessage(e.target.value)}
                        placeholder="Tell us why you'd like to host a radio show..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 mb-3 h-24 resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowJoinRequest(false)}
                          className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Handle join request submission
                            setShowJoinRequest(false);
                            setJoinRequestMessage('');
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-colors"
                        >
                          Submit Request
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-8">
                    <div className="relative flex-1">
                      <button 
                        onClick={() => setShowChannels(!showChannels)}
                        className="flex items-center gap-3 text-lg font-medium hover:text-cyan-400 transition-colors group"
                      >
                        <Radio size={24} className="group-hover:text-cyan-400" />
                        <span>{currentChannel}</span>
                        <span className="text-sm text-cyan-400">
                          {channels.find(c => c.name === currentChannel)?.frequency || newFrequency} FM
                        </span>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${showChannels ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Channel Selection Dropdown */}
                      {showChannels && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white/10 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg z-50">
                          {channels.map((channel, index) => (
                            <button
                              key={index}
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors first:rounded-t-lg group"
                              onClick={() => {
                                setCurrentChannel(channel.name);
                                setShowChannels(false);
                                setCustomChannel(false);
                              }}
                            >
                              <span className="font-medium">{channel.name}</span>
                              <span className="text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {channel.frequency} FM
                              </span>
                            </button>
                          ))}
                          <button
                            className="w-full px-4 py-3 flex items-center gap-2 hover:bg-white/5 transition-colors last:rounded-b-lg text-cyan-400"
                            onClick={() => {
                              setCustomChannel(true);
                              setShowChannels(false);
                            }}
                          >
                            <Plus size={18} />
                            <span>Add Custom Channel</span>
                          </button>
                        </div>
                      )}
                      {customChannel && (
                        <div className="mt-4 space-y-2">
                          <input
                            type="text"
                            value={newChannel}
                            onChange={(e) => setNewChannel(e.target.value)}
                            placeholder="Enter channel name..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                          />
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={newFrequency}
                              onChange={(e) => setNewFrequency(e.target.value)}
                              placeholder="Enter frequency (87.5-108.0)"
                              step="0.1"
                              min="87.5"
                              max="108.0"
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                            />
                            <button
                              onClick={() => {
                                if (newChannel && newFrequency) {
                                  setCurrentChannel(newChannel);
                                  setNewChannel('');
                                  setNewFrequency('');
                                  setCustomChannel(false);
                                }
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-colors whitespace-nowrap"
                            >
                              Add Channel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 
                          ${showTranscript 
                            ? 'bg-cyan-400/20 text-cyan-400' 
                            : 'bg-white/5 hover:bg-white/10'
                          }`}
                      >
                        <Waveform size={20} />
                        Live Transcript
                      </button>
                      <button 
                        onClick={() => setShowComments(!showComments)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 
                          ${showComments 
                            ? 'bg-cyan-400/20 text-cyan-400' 
                            : 'bg-white/5 hover:bg-white/10'
                          }`}
                      >
                        <MessageSquare size={20} />
                        Comments
                      </button>
                    </div>
                  </div>

                  {/* Live Chat */}
                  {showComments && (
                    <div className="bg-white/5 rounded-xl p-4 h-80 flex flex-col">
                      <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                        {comments.map((comment, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
                              {comment.user[0]}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.user}</span>
                                <span className="text-xs text-gray-400">{comment.time}</span>
                              </div>
                              <p className="text-gray-300">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                        />
                        <button className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 transition-colors">
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Live Transcript Section */}
            {showTranscript && (
              <div className="w-1/2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
                    Live Transcript
                  </h3>
                  <button 
                    onClick={() => setShowTranscript(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  {transcriptLines.map((line, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-colors"
                    >
                      <span className="text-sm text-cyan-400 block mb-1">{line.time}</span>
                      <p className="text-gray-300">{line.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Shows Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
            Past Shows
          </h2>
          <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 group">
            See All Shows
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastShows.map((show) => (
            <div 
              key={show.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={show.thumbnail} 
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-cyan-400" />
                    <span>{show.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-cyan-400" />
                    <span>{show.listeners.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-cyan-50">{show.title}</h3>
                <p className="text-sm text-gray-400 mb-2">Hosted by {show.host}</p>
                <p className="text-xs text-gray-500">{show.date}</p>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-500/30 transition-all duration-300 text-sm">
                  Listen to Recording
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
