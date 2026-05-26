import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Heart, Sparkles, X, Star } from "lucide-react";

function HeartRain() {
  const colors = ["#FF85A1", "#FFB3C1", "#FFC6FF", "#FF7F50", "#FF477E", "#FF007F"];
  const count = 30;
  
  const hearts = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: (i * (100 / count)) + (Math.random() * 2 - 1),
    size: Math.random() * 12 + 10,
    delay: Math.random() * 6,
    duration: Math.random() * 5 + 4,
    color: colors[i % colors.length],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-10%", x: `${heart.x}%`, opacity: 0, rotate: heart.rotation, scale: 0.5 }}
          animate={{
            y: "110%",
            opacity: [0, 0.8, 0.8, 0],
            rotate: [heart.rotation, heart.rotation + (heart.id % 2 === 0 ? 180 : -180)],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            color: heart.color,
            fontSize: `${heart.size}px`,
            left: 0,
            top: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setHasBeenOpened(true);
  };

  const letterLines = [
    "To my favourite human on his 18th Birthday,",
    "I don't know how 18 years of your life passed before me… but I'm grateful I get to be part of your story now.",
    "From the very first moment you walked into my life, everything became so much softer, safer, and happier. It is your big warm hand in mine, your silly jokes, your comforting look, and the cozy silences we share that make me fall for you more every single day.",
    "You have the kindest heart built out of pure gold, and you deserve a life filled with every drop of magic, laughter, and accomplishment there is. I am incredibly proud of the person you are becoming at 18.",
    "No matter what new pathways open up for you now, remember that you have me in your corner, forever cheering you on and loving you deeply.",
    "Happy 18th Birthday, baby. Thank you for existing. ❤️",
    "With infinite love & chocolate chip cookies, ",
    "Your favourite person 🌸"
  ];

  return (
    <section id="letter" className="relative py-20 px-4 md:px-8 bg-[#FFF5F7] border-b-2 border-[#FFD6E0] select-none overflow-hidden pb-28">
      
      {/* Permanent heart rain background once letter is opened */}
      {hasBeenOpened && <HeartRain />}

      {/* Decorative notebook background lines style container */}
      <div className="absolute top-10 left-10 text-xl font-mono text-[#FFD6E0] opacity-60">
        ✉️ LOVE_DIARY_CONFIDENTIAL
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Title elements */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-[#FFE5D9] text-[#FF85A1] font-extrabold text-xs rounded-full uppercase tracking-wider mb-3.5"
          >
            💌 SECRÈT ENVELOPE
          </motion.div>
          <h2 className="font-cursive text-4xl md:text-5xl text-[#FF85A1] font-bold mb-3">
            Handwritten Love Letter
          </h2>
          <p className="font-sans text-[#5D4E6D]/80 text-xs md:text-sm max-w-md mx-auto">
            A safe place containing words I wanted to tell you since we met. Click the envelope below to unfold my heart...
          </p>
        </div>

        {/* Envelope Interaction Stage */}
        <div className="relative w-full max-w-sm h-72 flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // SEALED ENVELOPE
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                whileHover={{ scale: 1.05 }}
                className="w-80 h-52 bg-[#FFE5D9] rounded-2xl shadow-2xl border-4 border-[#FFD6E0] flex flex-col items-center justify-center p-4 cursor-pointer relative group"
                onClick={handleOpen}
              >
                {/* Triangular back pocket flap overlay lines */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD6E0]/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
                
                {/* Envelope Seal Wax style button */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-16 h-16 rounded-full bg-[#FF85A1] border-4 border-[#FFD6E0] flex items-center justify-center text-white shadow-lg z-10"
                >
                  <Heart className="fill-white" size={24} />
                </motion.div>

                <p className="mt-4 font-cursive text-lg text-[#FF85A1] font-extrabold tracking-wide text-center">
                  Click to open 💌
                </p>
                <span className="text-[10px] font-mono text-[#5D4E6D]/60 mt-1 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-[#FFD6E0]">
                  Private for Ariyan ❤️
                </span>

                {/* Floating sparkle icon tags */}
                <Star className="absolute top-4 left-4 text-amber-400 rotate-12 scale-75 animate-bounce" />
                <Star className="absolute bottom-4 right-4 text-[#FF85A1] -rotate-12 scale-75 animate-bounce delay-300" />
              </motion.div>
            ) : (
              // OPENED FOLDER SCREEN OVERLAY (Modal letter)
              <motion.div
                key="opened-overlay"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md overflow-hidden"
              >
                {/* Immersion rain over background under reading viewport */}
                <HeartRain />

                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="relative max-w-xl w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-[#FFD6E0] border-t-8 border-t-[#FF85A1] max-h-[85vh] overflow-y-auto selection:bg-pink-200 notebook-lines z-10"
                >
                  {/* Decorative tape overlay */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#FFD6E0]/95 border-x-2 border-dashed border-[#FF85A1] rounded shadow-sm text-[10px] text-center font-mono text-[#5D4E6D] font-bold uppercase flex items-center justify-center tracking-widest select-none">
                    ⭐ MY SACRED VOW
                  </div>

                  {/* Close floating button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF5F7] hover:bg-[#FFE5D9] text-[#FF85A1] transition-all border border-[#FFD6E0] hover:scale-110 cursor-pointer"
                    title="Close Letter"
                  >
                    <X size={16} />
                  </button>

                  <div className="text-center mb-6">
                    <span className="text-xl animate-pulse inline-block">🌸🌸🌸</span>
                  </div>

                  {/* Letter Lines Content */}
                  <div className="space-y-4 font-sans text-stone-700 font-bold text-sm md:text-base leading-relaxed pl-1.5 border-l-2 border-rose-200">
                    {letterLines.map((line, idx) => {
                      // Apply cute handwriting fonts for cursive look
                      const isHeading = idx === 0;
                      const isSignoff = idx >= letterLines.length - 2;

                      return (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                          className={`${
                            isHeading 
                              ? "font-cursive text-2xl md:text-3xl text-rose-500 font-black mb-3" 
                              : isSignoff 
                                ? "font-cursive text-lg md:text-xl text-rose-400 font-extrabold italic mt-4" 
                                : "font-sans leading-relaxed text-stone-600"
                          } drop-shadow-sm`}
                        >
                          {line}
                        </motion.p>
                      );
                    })}
                  </div>

                  {/* Stamp graphic at bottom of paper */}
                  <div className="mt-8 flex items-center justify-between border-t border-dashed border-pink-200/60 pt-4 text-[10px] font-mono text-stone-400 select-none">
                    <span>SEALED WITH LOVE IN 2026</span>
                    <span className="text-pink-500 font-bold flex items-center gap-1">
                      🧁 CUPCAKE STAMP
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
