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
  StopCircle
} from 'lucide-react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const HostDashboard: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPowerOn, setPowerOn] = useState(true);
  const [message, setMessage] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  let peerConnection: RTCPeerConnection;
  
  const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  const startBroadcast = async () => {
    setIsStreaming(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMediaStream(stream);

    peerConnection = new RTCPeerConnection(config);
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", event.candidate);
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  const stopBroadcast = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsStreaming(false);
    console.log("Broadcast stopped.");
  };

  socket.on("answer", async (answer) => {
    await peerConnection.setRemoteDescription(answer);
  });

  socket.on("candidate", (candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

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
                {!isStreaming ? (
                  <button
                    onClick={startBroadcast}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500"
                  >
                    <MicOff className="w-8 h-8 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={stopBroadcast}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                  >
                    <StopCircle className="w-8 h-8 text-white" />
                  </button>
                )}
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-medium">247</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Requests */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <UserPlus className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Join Requests</h2>
          </div>
        </div>

        {/* Bottom Section - Live Comments */}
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
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
