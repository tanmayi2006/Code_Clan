// import React, { useState, useRef, useEffect } from "react";
// import { Play, Pause, X } from "lucide-react";

// const Seekbar = ({ song }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showSeekbar, setShowSeekbar] = useState(true);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.addEventListener("loadedmetadata", () => {
//         setDuration(audio.duration);
//       });

//       audio.addEventListener("timeupdate", () => {
//         setCurrentTime(audio.currentTime);
//       });
//     }
//   }, []);

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleSeek = (e) => {
//     const newTime = (e.target.value / 100) * duration;
//     setCurrentTime(newTime);
//     audioRef.current.currentTime = newTime;
//   };

//   const formatTime = (time) => {
//     if (!time || isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   if (!showSeekbar) return null;

//   return (
//     <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-[#0D152C] shadow-lg shadow-teal-500/30 backdrop-blur-lg p-4 rounded-2xl flex items-center gap-4 border border-teal-500/20">
//       <img
//         src={song.thumbnail}
//         alt={song.title}
//         className="w-14 h-14 rounded-lg shadow-lg"
//       />
//       <div className="flex-1">
//         <h3 className="text-teal-300 text-lg font-semibold">{song.title}</h3>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={(currentTime / duration) * 100 || 0}
//           onChange={handleSeek}
//           className="w-full h-2 bg-[#28D3D1] rounded-lg appearance-none cursor-pointer"
//         />
//         <div className="flex justify-between text-sm text-teal-400 mt-1">
//           <span>{formatTime(currentTime)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//       </div>
//       <button onClick={togglePlayPause} className="p-2 bg-[#28D3D1] rounded-full hover:bg-teal-400 transition">
//         {isPlaying ? <Pause className="text-[#0A0A1A]" size={20} /> : <Play className="text-[#0A0A1A]" size={20} />}
//       </button>
//       <button onClick={() => setShowSeekbar(false)} className="p-2 bg-[#D32F2F] rounded-full hover:bg-red-600 transition">
//         <X size={20} className="text-white" />
//       </button>
//       <audio ref={audioRef} src={song.audioUrl} />
//     </div>
//   );
// };

// export default Seekbar;
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";

const Seekbar = ({ song, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(song.links.audio));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = song.links.audio;
    audio.load();

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [song]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full px-6 py-4 bg-black bg-opacity-80 backdrop-blur-md flex items-center gap-6">
      {/* Album / Show Image */}
      <img
        src={song.image}
        alt={song.title}
        className="w-14 h-14 rounded-lg object-cover shadow-md"
      />

      {/* Song Info & Seekbar */}
      <div className="flex-1">
        <h3 className="text-white text-lg font-semibold truncate">{song.title}</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="w-full h-1 appearance-none bg-gray-600 rounded overflow-hidden cursor-pointer mt-2"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <button
        onClick={togglePlayPause}
        className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        {isPlaying ? (
          <Pause size={20} className="text-white" />
        ) : (
          <Play size={20} className="text-white" />
        )}
      </button>
      <button
        onClick={() => {
          audioRef.current.pause();
          onClose();
        }}
        className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        <X size={20} className="text-white" />
      </button>
    </div>
  );
};

export default Seekbar;
