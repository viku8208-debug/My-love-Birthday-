import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Music, Settings, RefreshCw } from "lucide-react";

// Predefined tracks
const TRACK_PRESETS = [
  {
    name: "Tere Sang Yaara",
    artist: "Atif Aslam",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Back up stable link
    youtubeId: "bJ-UNIO_LJk",
    startOffset: 79,
    timestamp: "Playing from 1:19 ❤️"
  }
];

export interface VinylPlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const VinylPlayer = forwardRef<VinylPlayerRef, { isInitiallyPlaying?: boolean }>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(props.isInitiallyPlaying || false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notes, setNotes] = useState<{ id: number; char: string; left: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = TRACK_PRESETS[activeTrackIdx];
  const isYouTube = !!(!customUrl && activeTrack?.youtubeId);
  const audioSourceUrl = customUrl ? customUrl : (isYouTube ? undefined : activeTrack.url);

  // Let parent call play / pause
  useImperativeHandle(ref, () => ({
    play: () => {
      if (isYouTube) {
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log("Audio play deferred", e));
      }
    },
    pause: () => {
      if (isYouTube) {
        setIsPlaying(false);
      } else if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
    toggle: () => {
      if (isYouTube) {
        setIsPlaying(!isPlaying);
      } else if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
        }
      }
    }
  }));

  // Handle Play/Pause local
  const togglePlay = () => {
    if (isYouTube) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log("Play failed", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (activeTrackIdx + 1) % TRACK_PRESETS.length;
    setActiveTrackIdx(nextIdx);
    setCustomUrl("");
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const currentTrack = TRACK_PRESETS[activeTrackIdx];
    if (currentTrack && typeof (currentTrack as any).startOffset === "number" && !customUrl) {
      audioRef.current.currentTime = (currentTrack as any).startOffset;
    }
  };

  // Re-start track when url/source changing
  useEffect(() => {
    if (isYouTube) return;
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [audioSourceUrl, isYouTube]);

  // Periodic floating note spawning when playing
  useEffect(() => {
    if (!isPlaying) return;

    let idCounter = 0;
    const interval = setInterval(() => {
      const chars = ["♪", "♫", "♬", "♩", "❤️", "🌙"];
      const newNote = {
        id: idCounter++,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 60 + 20, // keep centered near vinyl
      };
      setNotes((prev) => [...prev.slice(-10), newNote]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Settings popup panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-[#FFD6E0] text-xs font-sans text-[#5D4E6D]"
          >
            <div className="font-bold text-[#FF85A1] mb-2 flex items-center justify-between text-sm">
              <span>🎵 Love Jukebox Settings</span>
              <button onClick={() => setIsSettingsOpen(false)} className="text-stone-400 hover:text-stone-600">×</button>
            </div>
            <p className="text-stone-500 mb-3 leading-relaxed">
              Toggle sweet soundtrack presets or stream any custom mp3 file to personalize the vibe.
            </p>

            <div className="space-y-1.5 mb-3">
              {TRACK_PRESETS.map((tr, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTrackIdx(i);
                    setCustomUrl("");
                  }}
                  className={`w-full text-left p-2 rounded-xl border flex flex-col transition-all ${
                    activeTrackIdx === i && !customUrl
                      ? "bg-[#FFE5D9] border-[#FFD6E0] text-[#FF85A1] font-semibold"
                      : "bg-neutral-50 border-neutral-100 hover:bg-[#FFF5F7]"
                  }`}
                >
                  <span className="truncate">{tr.name}</span>
                  <span className="text-[10px] text-[#5D4E6D]/60 font-medium">{tr.artist} - {tr.timestamp}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#FF85A1] uppercase mb-1">Paste custom audio MP3 stream:</label>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="https://example.com/song.mp3"
                  className="flex-1 px-2.5 py-1.5 bg-[#FFF5F7] rounded-xl border border-[#FFD6E0] text-[11px] focus:outline-none focus:ring-1 focus:ring-[#FF85A1]"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                {customUrl && (
                  <button
                    onClick={() => setCustomUrl("")}
                    className="p-1.5 text-[#FF85A1] hover:bg-[#FFF5F7] rounded-lg"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main vinyl player card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-4 shadow-lg border-2 border-[#FFD6E0] w-72 h-[82px] relative"
      >
        <audio
          ref={audioRef}
          src={audioSourceUrl}
          loop
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
        />

        {isPlaying && isYouTube && (
          <iframe
            key={`${activeTrack.youtubeId}-${isMuted}`}
            className="absolute pointer-events-none opacity-0 w-1 h-1"
            src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1&start=${activeTrack.startOffset || 0}&loop=1&playlist=${activeTrack.youtubeId}&mute=${isMuted ? 1 : 0}`}
            allow="autoplay; encrypted-media"
          />
        )}

        {/* Floating Notes Animation wrapper */}
        <div className="absolute inset-x-0 -top-16 pointer-events-none h-16 overflow-visible">
          <AnimatePresence>
            {notes.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 1, y: 35, scale: 0.6, x: n.left }}
                animate={{
                  opacity: 0,
                  y: -25,
                  scale: 1.4,
                  x: n.left + (Math.random() * 40 - 20),
                  rotate: Math.random() * 80 - 40,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="absolute text-[#FF85A1] font-bold drop-shadow-sm pointer-events-none"
                style={{ fontSize: "16px" }}
              >
                {n.char}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* SPINNING VINYL DISK */}
        <div className="relative flex-shrink-0 cursor-pointer" onClick={togglePlay}>
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
            className={`w-14 h-14 rounded-full bg-stone-900 border-4 border-stone-800 flex items-center justify-center shadow-md relative ${
              isPlaying ? "shadow-[#FF85A1]/30" : ""
            }`}
          >
            {/* Grooves */}
            <div className="absolute inset-1 rounded-full border border-stone-700/50" />
            <div className="absolute inset-2 rounded-full border border-stone-800/80" />
            <div className="absolute inset-3 rounded-full border border-stone-700/50" />
            
            {/* Center Sticker */}
            <div className="w-5 h-5 rounded-full bg-[#FFD6E0] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </motion.div>
          {/* Tone arm */}
          <motion.div
            animate={isPlaying ? { rotate: 18 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
            style={{ originX: 0.8, originY: 0.2 }}
            className="absolute -top-1.5 right-0.5 w-6 h-10 pointer-events-none"
          >
            <svg viewBox="0 0 24 40" className="w-full h-full text-stone-400">
              <path
                d="M18,5 L14,14 L6,28 L4,32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect x="2" y="30" width="4" height="6" rx="1" fill="#FF85A1" />
            </svg>
          </motion.div>
        </div>

        {/* TITLE & ARTIST CONTROLS */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-xs font-bold text-stone-800 truncate leading-snug">
            {customUrl ? "Custom MP3 Stream" : activeTrack.name}
          </h4>
          <p className="text-[10px] text-[#FF85A1] font-medium truncate flex items-center gap-1">
            <Music size={10} className="animate-pulse" />
            <span>{customUrl ? "User URL" : activeTrack.artist}</span>
          </p>

          <div className="flex items-center gap-2 mt-1">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-1 px-2.5 rounded-lg bg-[#FFE5D9] hover:bg-[#FFD6E0] text-[#FF85A1] flex items-center justify-center border border-[#FFD6E0]/50 transition-all cursor-pointer shadow-sm shadow-pink-200"
            >
              {isPlaying ? <Pause size={11} className="fill-[#FF85A1] stroke-[#FF85A1]" /> : <Play size={11} className="fill-[#FF85A1] stroke-[#FF85A1]" />}
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX size={12} className="text-red-400" /> : <Volume2 size={12} />}
            </button>

            {/* Next presets */}
            <button
              onClick={handleNextTrack}
              title="Next Track Preset"
              className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
            >
              <RefreshCw size={11} />
            </button>

            {/* Settings trigger */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-1 rounded-lg transition-all cursor-pointer ${
                isSettingsOpen ? "text-[#FF85A1]" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <Settings size={11} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

VinylPlayer.displayName = "VinylPlayer";
export default VinylPlayer;
