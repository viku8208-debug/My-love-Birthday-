import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Gift, Moon, RotateCcw } from "lucide-react";

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
}

interface SkyLantern {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FIN_DIAL = [
  "Happy 18th Birthday Baby ❤️ Thank you for existing.",
  "Made with love just for you."
];

export default function FinalSection() {
  const [fireworks, setFireworks] = useState<FireworkParticle[]>([]);
  const [showCelebrationText, setShowCelebrationText] = useState(false);

  // Auto trigger some lanterns on screen load
  const [lanterns] = useState<SkyLantern[]>(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 6,
      size: Math.random() * 24 + 14,
      duration: Math.random() * 8 + 10, // 10s to 18s slow float
    }))
  );

  // Interactive firework launcher
  const launchFirework = () => {
    const burstCount = 45;
    const colors = ["#fca5a5", "#f472b6", "#c084fc", "#fbbf24", "#6ee7b7", "#60a5fa", "#ff007f"];
    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Spawn centered on click or arbitrary location
    const startX = Math.random() * 80 + 10; // % width
    const startY = Math.random() * 30 + 30; // % height

    const newParticles: FireworkParticle[] = Array.from({ length: burstCount }).map((_, idx) => {
      const angle = (idx * (360 / burstCount) * Math.PI) / 180;
      const speed = Math.random() * 4 + 2;
      return {
        id: Math.random() + idx,
        x: startX,
        y: startY,
        color: baseColor,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    setFireworks((prev) => [...prev.slice(-100), ...newParticles]); // keep max 100 on screen

    // clean up after 1.5s
    setTimeout(() => {
      setFireworks((prev) => prev.slice(burstCount));
    }, 1500);
  };

  useEffect(() => {
    // Show final text on viewport scroll entry
    const timer = setTimeout(() => {
      setShowCelebrationText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="final-moment" className="relative min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#4B3B6B] to-[#1A1A2E] text-pink-100 flex flex-col items-center justify-center py-20 px-4 select-none overflow-hidden pb-28">
      
      {/* GLOWING FULL MOON */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], filter: ["drop-shadow(0 0 20px rgba(254,243,199,0.5))", "drop-shadow(0 0 40px rgba(254,243,199,0.8))", "drop-shadow(0 0 20px rgba(254,243,199,0.5))"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-16 right-16 w-28 h-28 rounded-full bg-amber-50 pointer-events-none select-none z-10"
      />

      {/* FLOATING LANTERNS ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{
              y: "-15vh",
              opacity: [0, 0.9, 0.9, 0],
              x: `calc(${l.left}vw + ${Math.sin(l.id) * 35}px)`,
            }}
            transition={{
              duration: l.duration,
              repeat: Infinity,
              delay: l.delay,
              ease: "linear",
            }}
            className="absolute flex flex-col items-center pointer-events-none"
            style={{ width: l.size }}
          >
            {/* Glowing lantern vector body */}
            <div 
              className="rounded-t-lg rounded-b-md bg-amber-400 border border-amber-300 relative shadow-lg"
              style={{ width: l.size, height: l.size * 1.3 }}
            >
              {/* Bottom flame core */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping" />
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FIREWORKS CANVAS PARTICLES DRAWER */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden z-10">
        {fireworks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1, scale: 1.5 }}
            animate={{
              left: `${p.x + p.vx * 3}%`,
              top: `${p.y + p.vy * 3 + 4}%`, // gravity pull down slightly
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full pointer-events-none z-10"
            style={{ 
              backgroundColor: p.color, 
              boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}` 
            }}
          />
        ))}
      </div>

      {/* MID-SCREEN CONTENT CARD */}
      <div className="max-w-xl w-full z-20 text-center flex flex-col items-center p-4">
        
        {/* Sparkles / trigger banner */}
        <motion.button
          onClick={launchFirework}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-[#FF85A1] via-[#9D81B1] to-[#FFD6E0] text-slate-950 font-extrabold text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border-b-4 border-pink-700/50 cursor-pointer animate-bounce duration-1000"
        >
          <span>🎆 Tap to launch Fireworks!</span>
        </motion.button>

        {/* HUGGING CHIBI HUGGING PAIR ILLUSTRATION */}
        <div className="relative mb-8 w-44 h-44 flex items-center justify-center p-5 bg-white/5 backdrop-blur-sm rounded-full border border-[#FFD6E0]/20 shadow-inner group">
          
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent rounded-full animate-pulse pointer-events-none" />
          
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-7xl cursor-pointer hover:scale-110 transition-transform flex items-center select-none"
            title="Squeeze!"
          >
            🧑🏻‍❤️‍🧑🏻
          </motion.div>

          <span className="absolute bottom-1 font-mono text-[9px] text-[#FFD6E0] uppercase tracking-widest bg-[#1A1A2E] border border-[#FF85A1]/30 px-2.5 py-0.5 rounded-full select-none">
            Cuddle Locked ❤️
          </span>

          {/* Golden floating micro crowns */}
          <Sparkles className="absolute -top-2 -right-1 text-yellow-300 animate-spin" size={20} />
        </div>

        {/* LOVE TEXT BLOCKS */}
        <AnimatePresence>
          {showCelebrationText && (
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-cursive text-3xl md:text-5xl text-[#FF85A1] font-extrabold drop-shadow-md leading-relaxed"
              >
                Happy 18th Birthday Baby ❤️ <br />
                <span className="font-hand text-pink-100 font-medium text-2xl md:text-3xl tracking-wide">
                  Thank you for existing in my world.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="font-cursive text-xl md:text-2xl text-amber-300 tracking-wider font-semibold"
              >
                "Made with love just for you."
              </motion.p>
            </div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-xs font-mono text-[#FFD6E0]/80 max-w-sm leading-relaxed mx-auto uppercase tracking-widest bg-[#1A1A2E]/50 p-3 rounded-2xl border border-[#FFD6E0]/20">
          June 1, 2026 • Your 18 Years Milestones Verified • Handcrafted Diary Complete
        </p>

        {/* Back to top index utility */}
        <motion.button
          onClick={handleScrollTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 flex items-center gap-1.5 px-4.5 py-2.5 bg-[#1A1A2E] hover:bg-[#4B3B6B] border border-[#FFD6E0]/30 text-[#FF85A1] font-bold rounded-xl shadow-lg transition-all text-xs cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>Read Diary From Beginning</span>
        </motion.button>

      </div>

      {/* Cinematic bottom sticker */}
      <div className="absolute bottom-6 flex items-center gap-1.5 text-pink-400 font-black tracking-wide text-xs">
        <Gift size={12} className="animate-pulse" />
        <span>You are my perfect present, today & daily.</span>
      </div>

    </section>
  );
}
