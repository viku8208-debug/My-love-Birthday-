import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, HelpCircle, Star, Cat, Moon } from "lucide-react";

interface InteractiveObject {
  id: string;
  name: string;
  emoji: string;
  className: string;
  dialogue: string;
  actionWord: string;
}

const INTERACTIVE_ELEMENTS: InteractiveObject[] = [
  {
    id: "moon",
    name: "Glowing Cozy Moon",
    emoji: "🌙",
    className: "top-10 right-[15%] text-5xl",
    dialogue: "Moon says: 'May all your 18th wishes sail directly into the destiny constellation today...' 💫",
    actionWord: "Stars Rain!"
  },
  {
    id: "mailbox",
    name: "Secret Letterbox",
    emoji: "📮",
    className: "bottom-12 left-[12%] text-3xl",
    dialogue: "Mailbox says: 'You've got 1 new glowing love mail notification!' Look at the letter section below 💖",
    actionWord: "Open Letter!"
  },
  {
    id: "streetlamp",
    name: "Aesthetic Streetlamp",
    emoji: "🏮",
    className: "bottom-16 left-[40%] text-4xl",
    dialogue: "Streetlamp hums: 'I will light up your paths, keeping you soft, warm, and safe forever.' 🕯️",
    actionWord: "Warm Light!"
  },
  {
    id: "sleeping_cat",
    name: "Tiny Kawaii Kitten",
    emoji: "🐾",
    className: "bottom-12 right-[32%] text-3xl animate-pulse",
    dialogue: "Sleepy Cat meows: 'Prrrr... happy birthday to my favorite human! Pat me on my ears!' 😸",
    actionWord: "Purr & Hearts!"
  },
  {
    id: "bench",
    name: "Cozy Park Bench",
    emoji: "🏖️",
    className: "bottom-12 right-[10%] text-4xl",
    dialogue: "Bench invites: 'Grab two sweet bubble tea flavors and cuddle under the chilly night canopy here!' 🧋",
    actionWord: "Bubble Tea!"
  }
];

export default function ChibiSection() {
  const [dialogue, setDialogue] = useState<string>("Click on objects in our cozy anime town to unlock cute surprises!");
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  
  // Local stars array for clicked star showers
  const [particles, setParticles] = useState<{ id: number; char: string; left: string; top: string }[]>([]);

  const handleObjectClick = (item: InteractiveObject) => {
    setDialogue(item.dialogue);
    setClickedItem(item.id);
    
    // Trigger localized particles
    let count = 0;
    const interval = setInterval(() => {
      const chars = ["❤️", "⭐", "✨", "🌸", "🍡", "🌙"];
      const newParticle = {
        id: Math.random(),
        char: chars[Math.floor(Math.random() * chars.length)],
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 40 + 20}%`,
      };
      setParticles((prev) => [...prev, newParticle]);
      count++;
      if (count > 8) clearInterval(interval);
    }, 100);

    // Clean up particles
    setTimeout(() => {
      setParticles((prev) => prev.slice(8));
    }, 3000);
  };

  return (
    <section id="chibi-world" className="relative h-[480px] bg-gradient-to-b from-[#1A1A2E] via-[#4B3B6B] to-[#FF85A1] border-b-2 border-[#FFD6E0] select-none overflow-hidden flex flex-col justify-between">
      
      {/* Starry sky layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1A2E]/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Drifting sparkle particles */}
      <div className="absolute top-4 left-4 text-xs font-mono text-[#FFD6E0] opacity-60 flex items-center gap-1">
        <Sparkles size={11} className="animate-spin" />
        <span>CHIBI NIGHT DIARY v1.8</span>
      </div>

      {/* Rain of falling stars/hearts container */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "100%", opacity: 0, scale: 0.5 }}
              animate={{ y: "15vh", opacity: [0, 1, 1, 0], scale: [0.5, 1.3, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute text-xl pointer-events-none"
              style={{ left: p.left, top: p.top }}
            >
              {p.char}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Board & dialogue box */}
      <div className="px-4 pt-12 text-center text-white z-20">
        <h2 className="font-cursive text-3xl md:text-4xl text-[#FFD6E0] font-bold mb-2 flex items-center justify-center gap-2 drop-shadow-md">
          <Moon size={24} className="fill-[#FFD6E0] text-pink-300 animate-pulse" />
          <span>Our Secret Chibi World 🌟</span>
        </h2>
        
        {/* Dialogue Bubble */}
        <div className="max-w-xl mx-auto bg-[#1A1A2E]/90 backdrop-blur-md border-2 border-[#FFD6E0]/60 p-3.5 px-6 rounded-2xl shadow-xl mt-3 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF85A1] text-white font-extrabold font-sans text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Kawaii Dialogue Console
          </div>
          <p className="font-sans text-xs md:text-sm text-pink-50 leading-relaxed font-semibold">
            {dialogue}
          </p>
        </div>
      </div>

      {/* Townscape skyline silhouette (CSS vectors) */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none">
        <svg viewBox="0 0 1000 160" className="w-full h-full text-indigo-950/40 fill-current">
          <path d="M0,160 L0,110 L40,110 L40,130 L110,130 L110,95 L160,95 L160,120 L230,120 L230,105 L290,105 L290,135 L330,135 L330,85 L410,85 L410,115 L480,115 L480,130 L550,130 L550,100 L590,100 L590,140 L640,140 L640,90 L710,90 L710,120 L770,120 L770,105 L840,105 L840,135 L910,135 L910,110 L1000,110 L1000,160 Z" />
        </svg>
      </div>

      {/* Interactive elements placement on ground track */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        {INTERACTIVE_ELEMENTS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleObjectClick(item)}
            className={`absolute ${item.className} hover:scale-125 hover:rotate-6 transition-transform cursor-pointer outline-none focus:outline-none select-none drop-shadow-md`}
            title={`Click ${item.name}`}
          >
            <motion.div
              animate={clickedItem === item.id ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
              onAnimationComplete={() => clickedItem === item.id && setClickedItem(null)}
              transition={{ duration: 0.5 }}
              className="relative group/btn"
            >
              <span className="text-3xl md:text-4xl">{item.emoji}</span>
              {/* Tooltip bubble on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover/btn:opacity-100 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap transition-all shadow pointer-events-none">
                {item.actionWord}
              </div>
            </motion.div>
          </button>
        ))}
      </div>

      {/* THE WALKING CHIBI COUPLE & CATS */}
      <div className="w-full h-24 bg-gradient-to-t from-stone-900/60 to-transparent relative z-20 flex items-end justify-center pb-6">
        
        {/* Walking track frame */}
        <div className="flex items-end gap-5 justify-center relative">
          
          {/* Chibi Girlfriend bouncing avatar */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Soft pink heart bubble over her head */}
            <motion.span 
              animate={{ opacity: [0.4, 0.9, 0.4], y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[10px] bg-[#FF85A1] text-white font-extrabold px-2 py-0.5 rounded-full select-none shadow-sm"
            >
              Love you 💖
            </motion.span>
            <div className="w-14 h-14 bg-pink-100 rounded-full border-2 border-[#FFD6E0] flex items-center justify-center text-3xl shadow-lg relative cursor-pointer hover:bg-pink-200 select-none">
              👧🏻
              <span className="absolute bottom-0 -right-1 text-sm bg-rose-400 text-white rounded-full p-0.5 font-bold">🌸</span>
            </div>
            <span className="text-[10px] font-bold text-pink-200 mt-1 uppercase font-sans">GF</span>
          </motion.div>

          {/* Cuddling following cats */}
          <motion.div
            animate={{ x: [-5, 5, -5], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center pb-2"
          >
            <span className="text-2xl cursor-pointer">🐈‍⬛</span>
            <span className="text-[8px] bg-[#1A1A2E] text-stone-300 px-1 py-0.5 rounded font-mono uppercase tracking-widest leading-none">Chiya</span>
          </motion.div>

          <motion.div
            animate={{ x: [5, -5, 5], y: [-3, 0, -3] }}
            transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center pb-2"
          >
            <span className="text-2xl cursor-pointer">🐈</span>
            <span className="text-[8px] bg-[#1A1A2E] text-stone-300 px-1 py-0.5 rounded font-mono uppercase tracking-widest leading-none">Ariyan</span>
          </motion.div>

          {/* Chibi Birthday Boyfriend bouncing avatar */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Yellow star/light bubble over his head */}
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5], y: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-[11px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full select-none shadow-sm"
            >
              18 Today! 🎉
            </motion.span>
            <div className="w-14 h-14 bg-blue-100 rounded-full border-2 border-blue-200 flex items-center justify-center text-3xl shadow-lg relative cursor-pointer hover:bg-blue-200 select-none">
              👦🏻
              <span className="absolute -top-1.5 -left-1 text-lg">👑</span>
            </div>
            <span className="text-[10px] font-bold text-blue-200 mt-1 uppercase font-sans">BF</span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
