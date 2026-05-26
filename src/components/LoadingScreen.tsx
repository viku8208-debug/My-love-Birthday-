import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Music, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [readyToEnter, setReadyToEnter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setReadyToEnter(true);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF5F7] p-6 text-center select-none overflow-hidden scrapbook-bg">
      {/* Decorative stars and clouds */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce duration-1000">☁️</div>
      <div className="absolute top-16 right-12 text-3xl animate-pulse">⭐</div>
      <div className="absolute bottom-20 left-16 text-3xl animate-pulse delay-300">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-700">☁️</div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 border-4 border-[#FFD6E0] border-t-8 border-t-[#FF85A1] shadow-xl relative"
      >
        {/* Ribbon decoration */}
        <div className="absolute -top-5.5 left-1/2 -translate-x-1/2 bg-[#FF85A1] text-white font-bold px-6 py-1.5 rounded-full text-sm tracking-wider shadow-md uppercase">
          💘 June 1st is near!
        </div>

        <div className="mb-6 mt-4 flex justify-center text-[#FF85A1] relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="p-4 bg-pink-50 rounded-full"
          >
            <Heart size={48} className="fill-[#FFD6E0] stroke-[#FF85A1]" />
          </motion.div>
          
          {/* Floating sparks around cupids */}
          <Sparkles className="absolute -top-2 -right-2 text-amber-500 animate-spin" size={24} />
        </div>

        <h1 className="font-cursive text-3xl md:text-4xl text-[#FF85A1] mb-2 font-semibold">
          My Sweetheart's 18th Birthday Countdown
        </h1>
        <p className="text-[#5D4E6D] text-sm font-medium mb-6">
          A digital love letter, a secret chibi world, and sweet memories compiled just for you.
        </p>

        {/* Loading Progress or Enter button */}
        <div className="min-h-[90px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {!readyToEnter ? (
              <motion.div
                key="loading-tracker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="w-full h-4 bg-[#FFF5F7] rounded-full overflow-hidden border border-[#FFD6E0] p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-300 via-[#FF85A1] to-[#FF85A1] shadow-inner"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs font-mono text-[#5D4E6D] font-bold">
                  Assembling cute stickers and floating hearts... {progress}%
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="enter-action"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="w-full py-4 px-6 bg-[#FF85A1] hover:bg-[#FF85A1]/90 text-white font-bold rounded-2xl shadow-lg border-b-4 border-rose-600/50 transition-all font-sans text-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <Music size={22} className="animate-bounce" />
                <span>Open Our Love Diary 💖</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center items-center gap-2 text-xs text-[#5D4E6D] font-bold bg-[#FFF5F7]/80 py-2 rounded-xl border border-[#FFD6E0]">
          <span>🎧 Put on your headphones for music</span>
        </div>
      </motion.div>

      {/* Decorative credit at the absolute bottom (humble indicator) */}
      <div className="absolute bottom-4 text-xs text-rose-300 font-semibold tracking-wide">
        Made with love ❤️ June 1st, 2026
      </div>
    </div>
  );
}
