import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Stars } from "lucide-react";

interface IntroSectionProps {
  coupleImage: string;
  catImage: string;
}

export default function IntroSection({ coupleImage, catImage }: IntroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = "You made my world softer, safer, and happier...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Soft random hearts floating upwards in Section 1
  const [floatingHearts] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 8,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 6 + 6,
    }))
  );

  return (
    <section id="intro" className="relative min-h-screen flex flex-col items-center justify-center pt-8 pb-16 px-4 md:px-8 scrapbook-bg overflow-hidden select-none">
      
      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "105vh", opacity: 0, scale: 0.5 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.5, 1, 1.2, 0.8],
              x: `calc(${heart.left}vw + ${Math.sin(heart.id) * 40}px)`,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}
            className="absolute text-pink-300 pointer-events-none opacity-40 select-none"
            style={{ fontSize: `${heart.size}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Decorative Sky Clouds */}
      <motion.div 
        animate={{ x: [-20, 10, -20] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute top-12 left-10 md:left-24 text-4xl opacity-50 font-sans pointer-events-none select-none"
      >
        ☁️
      </motion.div>
      <motion.div 
        animate={{ x: [10, -15, 10] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute top-24 right-10 md:right-32 text-5xl opacity-40 font-sans pointer-events-none select-none"
      >
        ☁️
      </motion.div>

      {/* Main Glassmorphic Photo Album and Title Board */}
      <div className="max-w-4xl w-full z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        
        {/* Left Side: Polaroid Photo Container */}
        <motion.div
          initial={{ opacity: 0, rotate: -6, y: 30 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileHover={{ rotate: 1, scale: 1.02 }}
          className="flex-shrink-0 w-full max-w-[340px] md:max-w-[360px] bg-white p-4 pb-12 rounded-2xl shadow-xl border-4 border-[#FFD6E0] border-t-8 border-t-[#FF85A1] relative group"
        >
          {/* Aesthetic Tape on top of the polaroid */}
          <div className="absolute -top-4.5 left-1/3 -translate-x-1/2 w-28 h-8 bg-[#FFD6E0]/80 backdrop-blur-sm -rotate-12 border-x-2 border-dashed border-[#FF85A1]/60 opacity-95 flex items-center justify-center text-[10px] font-mono text-[#5D4E6D] font-bold tracking-wider">
            ⭐ FOREVER & ALWAYS
          </div>

          <div className="absolute -top-3.5 right-6 w-10 h-10 flex items-center justify-center text-[#FF85A1] bg-[#FFF5F7] rounded-full shadow-inner border border-[#FFD6E0] group-hover:scale-110 transition-transform">
            🌸
          </div>

          {/* Polaroid Image Wrapper */}
          <div className="w-full aspect-[4/3] bg-rose-50 rounded-lg overflow-hidden border-2 border-pink-50 relative">
            <img
              src={coupleImage}
              alt="Chibi Couple under blossom trees"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Polaroid Greeting Caption */}
          <div className="mt-5 text-center px-2">
            <h3 className="font-cursive text-2xl md:text-3xl text-[#FF85A1] font-bold leading-normal">
              Us on June 1st ✨
            </h3>
            <p className="text-xs font-mono text-[#5D4E6D]/60 mt-1 tracking-wider">
              Happy 18th, Birthday Boy • 2026
            </p>
          </div>

          {/* Tiny chibi cat cuddling inside the Polaroid */}
          <div className="absolute -bottom-2 -left-3 w-16 h-16 origin-bottom z-20 hover:scale-110 transition-transform">
            <img
              src={catImage}
              alt="Cute fluffy kitty cat"
              className="w-full h-full object-contain pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Right Side: Floating Text / Typing Panel */}
        <div className="flex-1 text-center lg:text-left flex flex-col justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block self-center lg:self-start bg-[#FFE5D9] px-4 py-1.5 rounded-full text-[#FF85A1] font-extrabold text-xs mb-4 tracking-wider uppercase border border-[#FFD6E0]/50 shadow-sm"
          >
            🌸 Sweet 18th Birthday Celebration
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-cursive text-4xl md:text-6xl text-[#5D4E6D] font-bold mb-4 leading-snug drop-shadow-sm tracking-wide"
          >
            Happy 18th Birthday <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF85A1] via-[#9D81B1] to-[#FF85A1] drop-shadow-[0_0_20px_rgba(255,133,161,0.3)] animate-glow-pulse">
              My Whole World ❤️
            </span>
          </motion.h1>

          <div className="min-h-[50px] font-sans text-[#5D4E6D] font-bold text-lg md:text-xl pl-1 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1 pb-4">
            <span className="text-[#FF85A1] block">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1 h-6 bg-[#FF85A1]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-[#5D4E6D]/80 max-w-md mx-auto lg:mx-0 leading-relaxed font-sans text-sm md:text-base mb-6"
          >
            To the boy who has my entire heart. Your smile is my daily dose of sunshine, and your soft chuckles cure every bad day. Today, you are finally 18, and I am so grateful to be by your side as you unlock this magical milestone! Let's embark on this scrolling voyage of our beautiful story together...
          </motion.p>

          {/* Action Call to scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <a
              href="#timeline"
              className="px-6 py-3 bg-[#FF85A1] hover:bg-[#FF85A1]/90 text-white font-bold rounded-xl shadow-lg shadow-[#FFD6E0] transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
              <Heart className="fill-white" size={16} />
              <span>Scroll Our Story</span>
            </a>
            
            <a
              href="#chibi-world"
              className="px-6 py-3 bg-white hover:bg-[#FFE5D9] text-[#5D4E6D] font-bold rounded-xl border-2 border-[#FFD6E0] hover:border-[#FF85A1] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stars size={16} className="text-amber-500 animate-pulse" />
              <span>Play Chibi game</span>
            </a>
          </motion.div>

        </div>

      </div>

      {/* Animated cute cat floating / walking across screen */}
      <div className="absolute bottom-4 left-0 right-0 h-10 pointer-events-none overflow-hidden select-none z-10">
        <motion.div
          animate={{ x: ["-10vw", "110vw"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex items-center gap-1.5"
        >
          <span className="text-xl animate-bounce">🐈</span>
          <span className="text-[10px] bg-white border border-pink-100 text-stone-500 font-bold font-sans px-2 py-0.5 rounded-full shadow-sm">
            pat-pat.. following heart trails..
          </span>
        </motion.div>
      </div>

      {/* Down arrow marker */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
        <span className="text-[10px] font-bold text-pink-400 tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-pink-400 text-lg"
        >
          ↓
        </motion.div>
      </div>

    </section>
  );
}
