import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Pin, ChevronLeft, ChevronRight, Play, Pause, Cake, Sparkle, MessageCircle } from "lucide-react";
import { PolaroidPhoto } from "../types";

interface GallerySectionProps {
  coupleImage: string;
  catImage: string;
}

// Generated photorealistic images of the person
const IMG_HEART = "/src/assets/images/pastel_glowing_heart_1779728996242.png";

const PASTEL_PHOTOS = (coupleImage: string, catImage: string): PolaroidPhoto[] => [
  {
    id: "photo1",
    title: "Holding Hands ❤️",
    date: "Sunny Autumn Afternoon",
    caption: "The day my fingers fit perfectly between yours.",
    imageAlt: "Cute hands",
    bgColor: "bg-rose-50",
    sticker: "heart",
    rotation: -2,
  },
  {
    id: "photo2",
    title: "Double Sparkles ✨",
    date: "Our Midnight Walk",
    caption: "Wandering under stars with warm coffee mugs.",
    imageAlt: "Chibi couple illustration",
    bgColor: "bg-blue-50",
    sticker: "star",
    rotation: 3,
  },
  {
    id: "photo3",
    title: "Fluffy Guardians 🐾",
    date: "Cat Cafè Date",
    caption: "Two puffballs of joy who love you almost as much as I do!",
    imageAlt: "Sleeping cats",
    bgColor: "bg-amber-50",
    sticker: "cat",
    rotation: -3,
  },
  {
    id: "photo4",
    title: "Forever Love 💖",
    date: "Our Heart of Hearts",
    caption: "A special heart that shines bright, beating only for you.",
    imageAlt: "Glistening pastel pink heart",
    bgColor: "bg-purple-50",
    sticker: "heart",
    rotation: 2,
  }
];

// Aesthetic CDN image fallbacks with referer policy
const MEMORY_IMAGES = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", // sweet hearts hands
];

// Sweet handwritten memory-lane secret letters / diary notes
const MEMORY_NOTES: Record<string, string> = {
  photo1: "Remember how sweaty my palms were? But you just squeezed tighter and whispered 'forever'. It's still my absolute favorite feeling in the world. ❤️",
  photo2: "We argued about which star was which constellation for 20 minutes before giving up and wishing on a satellite. Being clueless with you is my happy place! ✨",
  photo3: "The orange cat wouldn't stop licking your sleeve, and I was so jealous because I wanted to cuddle too! Let's build a cat sanctuary one day! 🐾",
  photo4: "No matter how much time passes or how busy life gets, my heart beats to the exact same sweet pattern as yours. You are my forever home. 🌸",
};

// Confetti particle interface
interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  angle: number;
  spin: number;
}

interface FloatingHeart {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
  angle: number;
}

export default function GallerySection({ coupleImage, catImage }: GallerySectionProps) {
  // Carousel slide state
  const [activeIdx, setActiveIdx] = useState(0);
  const [galleryHearts, setGalleryHearts] = useState<FloatingHeart[]>([]);

  const triggerHeartBurst = () => {
    const heartEmojis = ["💖", "💗", "💓", "💝", "💕", "❤️", "🌸", "💌", "💝"];
    const newHearts: FloatingHeart[] = Array.from({ length: 32 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      x: 5 + Math.random() * 90,
      y: 75 + Math.random() * 15,
      scale: 0.5 + Math.random() * 0.9,
      duration: 3.5 + Math.random() * 2.5,
      angle: -40 + Math.random() * 80,
    }));
    setGalleryHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setGalleryHearts((prev) => prev.slice(32));
    }, 6000);
  };

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredPolaroid, setHoveredPolaroid] = useState(false);

  // Polaroid Interactive States (Likes count and secret handwritten diary open view)
  const [likes, setLikes] = useState<Record<string, number>>({
    photo1: 18,
    photo2: 24,
    photo3: 42,
    photo4: 88,
  });
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Close active note on slide transition
  useEffect(() => {
    setOpenNoteId(null);
  }, [activeIdx]);

  // Cake Cutting State
  const [isCut, setIsCut] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [cakeCutProgress, setCakeCutProgress] = useState(0); // 0 waiting, 1 cutting, 2 sliced!
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [floatingQuotes, setFloatingQuotes] = useState<string[]>([]);
  const [showSliceMessage, setShowSliceMessage] = useState(false);

  // Dynamic butterflies
  const [butterflies] = useState(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: 10 + i * 16 + Math.random() * 4,
      delay: i * 2.0,
      duration: 12 + Math.random() * 5,
    }))
  );

  const photos = PASTEL_PHOTOS(coupleImage, catImage);

  // Auto-slide effect for human-crafted polaroid carousel
  useEffect(() => {
    if (!isAutoPlaying || hoveredPolaroid) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, hoveredPolaroid, photos.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Run native, high-fidelity confetti particles generator
  const triggerConfettiShowers = () => {
    const colors = ["#FF85A1", "#FFD6E0", "#FFE5D9", "#E2D1F9", "#9D81B1", "#FFC2D1", "#FBCFE8", "#FFF5F7", "#FDA4AF"];
    const generated: ConfettiPiece[] = Array.from({ length: 70 }).map((_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30, // Center cluster
      y: 50 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 12,
      delay: Math.random() * 0.5,
      angle: -45 + Math.random() * 90, // upwards direction
      spin: Math.random() * 360,
    }));
    setConfetti(generated);
  };

  // Handle cutting the cake together sequence
  const handleCutCakeAction = () => {
    if (cakeCutProgress === 0) {
      setCakeCutProgress(1);
      setTimeout(() => {
        setCakeCutProgress(2);
        setIsCut(true);
        triggerConfettiShowers();
        setShowSliceMessage(true);
        // Dynamic sweet talking speech thoughts
        setFloatingQuotes([
          "YAY! Happy 18th birthday Ariyan! 🎉",
          "Love you to the moon, now and forever! ❤️",
          "Cut a giant slice for your sweet tooth! 🍰",
          "Yay, Chiya and Ariyan forever! 🥰"
        ]);
      }, 1200);
    } else if (cakeCutProgress === 2) {
      // Re-trigger visual excitement Confetti
      triggerConfettiShowers();
    }
  };

  const handleBlowCandlesAction = () => {
    setIsBlown(true);
    setFloatingQuotes((prev) => [...prev, "🕯️ *Pufff* Happy wishes made! ✨"]);
  };

  const handleResetCakeAction = () => {
    setIsCut(false);
    setIsBlown(false);
    setCakeCutProgress(0);
    setConfetti([]);
    setShowSliceMessage(false);
    setFloatingQuotes([]);
  };

  // Get current active details
  const activePhoto = photos[activeIdx];
  let activeImgSrc = coupleImage;
  if (activePhoto) {
    if (activePhoto.id === "photo1") activeImgSrc = MEMORY_IMAGES[0];
    else if (activePhoto.id === "photo2") activeImgSrc = coupleImage;
    else if (activePhoto.id === "photo3") activeImgSrc = catImage;
    else if (activePhoto.id === "photo4") activeImgSrc = IMG_HEART;
  }

  return (
    <section id="gallery" className="relative py-20 px-4 md:px-8 bg-[#FFF5F7] border-b border-[#FFD6E0] select-none overflow-hidden pb-32">
      
      {/* Floating Gallery Hearts Burst */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {galleryHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ 
                x: `${heart.x}%`, 
                y: "85%", 
                opacity: 0, 
                scale: 0.1,
                rotate: 0 
              }}
              animate={{ 
                y: "-10%", 
                x: [
                  `${heart.x}%`, 
                  `${heart.x + heart.angle / 3}%`, 
                  `${heart.x - heart.angle / 4}%`, 
                  `${heart.x + heart.angle / 2}%`
                ],
                opacity: [0, 1, 1, 0.7, 0],
                scale: [0.3, heart.scale, heart.scale, 0.4],
                rotate: [-25, 25, -25, 25]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: heart.duration, 
                ease: "easeInOut" 
              }}
              className="absolute text-4xl select-none"
            >
              {heart.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Wooden support bar / rope for hanging effect */}
      <div className="absolute top-44 left-0 right-0 h-1 bg-[#FFD6E0] opacity-80 z-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#FF85A1] to-transparent" />
      </div>

      {/* Floating Butterflies */}
      <div className="absolute inset-x-0 top-0 h-44 pointer-events-none overflow-hidden select-none">
        {butterflies.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "150%", opacity: 0, x: `${b.left}vw` }}
            animate={{
              y: "-50px",
              opacity: [0, 0.8, 0.8, 0],
              x: [
                `${b.left}vw`,
                `${b.left + 5}vw`,
                `${b.left - 4}vw`,
                `${b.left}vw`
              ],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
            className="absolute text-2xl select-none"
          >
            🦋
          </motion.div>
        ))}
      </div>

      {/* Titles block */}
      <div className="max-w-xl mx-auto text-center mb-16 z-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#FF85A1] text-xs font-bold tracking-wide mb-3"
        >
          <Sparkles size={11} className="fill-pink-400 text-pink-500 animate-spin" />
          <span>POLAROIDS RECORDED WITH LOVE</span>
        </motion.div>

        <h2 className="font-cursive text-4xl md:text-5xl text-[#FF85A1] font-bold mb-3">
          Our Memory Gallery 🎞️
        </h2>
        <p className="font-sans text-[#5D4E6D]/80 text-xs md:text-sm px-2">
          Gently sliding along the sacred threads of our relationship. Hover to pause or use navigation buttons to wander our special archives!
        </p>
      </div>

      {/* Hanging Polaroid Carousel block */}
      <div 
        className="max-w-xl mx-auto flex flex-col items-center justify-center relative min-h-[500px] mb-28 z-20"
        onMouseEnter={() => setHoveredPolaroid(true)}
        onMouseLeave={() => setHoveredPolaroid(false)}
      >
        {/* Carousel controls - Left arrow */}
        <div className="absolute left-[-20px] md:left-[-70px] z-30">
          <motion.button
            whileHover={{ scale: 1.15, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            id="carousel-prev"
            className="w-12 h-12 rounded-full bg-white border-2 border-[#FFD6E0] text-[#FF85A1] hover:text-[#FF85A1]/90 hover:bg-[#FFF5F7] flex items-center justify-center shadow-md cursor-pointer transition-colors"
            title="Previous Memory"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Carousel controls - Right arrow */}
        <div className="absolute right-[-20px] md:right-[-70px] z-30">
          <motion.button
            whileHover={{ scale: 1.15, x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            id="carousel-next"
            className="w-12 h-12 rounded-full bg-white border-2 border-[#FFD6E0] text-[#FF85A1] hover:text-[#FF85A1]/90 hover:bg-[#FFF5F7] flex items-center justify-center shadow-md cursor-pointer transition-colors"
            title="Next Memory"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Single Polaroid Container with Smooth Fade-in Mode */}
        <div className="relative w-full max-w-[320px] flex flex-col items-center">
          {/* Hanging string */}
          <div className="absolute -top-[115px] left-1/2 -translate-x-1/2 w-0.5 h-[115px] bg-[#FFD6E0] pointer-events-none select-none z-0" />
          
          {/* Hanging Pin / Clip */}
          <div className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <Pin size={24} className="text-[#FF85A1] fill-[#FFD6E0] drop-shadow-md rotate-[15deg]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.92, rotate: activePhoto.rotation * 0.7 }}
              animate={{ opacity: 1, scale: 1, rotate: activePhoto.rotation }}
              exit={{ opacity: 0, scale: 0.92, rotate: activePhoto.rotation * -0.7 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full bg-white p-4 pb-8 rounded-2xl shadow-xl border-4 border-[#FFD6E0] border-t-[10px] border-t-[#FF85A1] relative flex flex-col z-20 group"
            >
              {/* Secret handwritten-style notebook note paper absolute overlay */}
              <AnimatePresence>
                {openNoteId === activePhoto.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#FFFDF0] rounded-xl shadow-2xl p-5 border-2 border-yellow-100 flex flex-col justify-between z-40 select-none cursor-default"
                    style={{
                      backgroundImage: "radial-gradient(#F3E5AB 1.5px, transparent 1.5px)",
                      backgroundSize: "20px 20px"
                    }}
                  >
                    {/* Retro notebook tape mockup */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FF85A1] border-x-2 border-dashed border-[#FFD6E0] shadow-sm rounded-sm text-[10px] font-mono font-black text-white text-center uppercase tracking-widest leading-none">
                      HANDWRITTEN NOTE 💌
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center mt-4">
                      {/* Sweet handwritten message in Caveat font */}
                      <p className="font-hand text-xl md:text-2xl text-[#4B3B6B] leading-relaxed text-center font-bold px-2 py-1">
                        {MEMORY_NOTES[activePhoto.id]}
                      </p>
                    </div>

                    <div className="flex justify-center mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenNoteId(null);
                        }}
                        className="py-1.5 px-4 bg-[#FF85A1] hover:bg-[#FF85A1]/95 text-white font-extrabold text-xs rounded-full shadow-md flex items-center gap-1 border-b-2 border-rose-700/50 cursor-pointer transition-transform duration-100 hover:scale-105 active:scale-95 animate-pulse"
                      >
                        <Heart size={11} className="fill-white" />
                        <span>Fold & Close</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Sticker Label */}
              <div 
                className="absolute -top-7 -right-3 transform rotate-12 bg-pink-100/90 text-rose-500 py-1 px-3 rounded-full shadow-md border-2 border-white select-none whitespace-nowrap text-[11px] font-bold tracking-wider"
              >
                {activePhoto.sticker === "heart" && "💖 CUDDLES"}
                {activePhoto.sticker === "star" && "⭐ MAGICAL"}
                {activePhoto.sticker === "cat" && "🐱 CAT LOVER"}
                {activePhoto.sticker === "flower" && "🌸 SUNBEAM"}
                {activePhoto.sticker === "crown" && "👑 SWEETHEART"}
              </div>

              {/* Tape top decor */}
              <div className="absolute -top-4.5 -left-2 transform -rotate-12 w-20 h-6 bg-[#FFD6E0]/80 border-x-2 border-dashed border-[#FF85A1]/40 shadow-sm rounded-sm" />

              {/* Polaroid Photo aspect wrapper */}
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-neutral-100 bg-[#FFF5F7] relative">
                <img
                  src={activeImgSrc}
                  alt={activePhoto.imageAlt}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-pink-900/5 mix-blend-multiply opacity-50 pointer-events-none" />
                
                {/* Autoplay pulse active marker */}
                {isAutoPlaying && !hoveredPolaroid && (
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FF85A1] animate-ping" />
                )}
              </div>

              {/* Text caption Area */}
              <div className="mt-4 px-1 text-center font-sans">
                <h4 className="font-cursive text-2xl text-[#FF85A1] font-extrabold leading-tight">
                  {activePhoto.title}
                </h4>
                <p className="text-[11px] text-[#5D4E6D]/65 font-mono tracking-wider mt-1 uppercase">
                  {activePhoto.date}
                </p>
                <p className="text-[#5D4E6D]/85 font-sans text-xs leading-relaxed mt-3 italic border-t border-dashed border-pink-100 pt-2.5 font-medium">
                  "{activePhoto.caption}"
                </p>

                {/* Love Likes & Handwritten Note toggle bubble */}
                <div className="mt-4 pt-3 border-t border-dashed border-pink-100 flex flex-wrap gap-2 items-center justify-center sm:justify-around font-sans">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(activePhoto.id);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full text-[#FF85A1] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 group/like"
                    title="Tap to like memory"
                  >
                    <Heart size={12} className="fill-[#FF85A1] group-hover/like:scale-125 transition-transform" />
                    <span>{likes[activePhoto.id] || 0}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHeartBurst();
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-[#FFF0F3] hover:bg-[#FFE5EC] border border-rose-200 rounded-full text-[#FF5D8F] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 hover:scale-105 active:scale-95"
                    title="Trigger a sweet heart burst! 💕"
                  >
                    <Heart size={12} className="fill-[#FF5D8F] animate-pulse" />
                    <span>Burst 💖</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenNoteId(openNoteId === activePhoto.id ? null : activePhoto.id);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 animate-bounce"
                    style={{
                      animationDuration: '3s',
                      backgroundColor: openNoteId === activePhoto.id ? '#FF85A1' : '#FFF5F7',
                      color: openNoteId === activePhoto.id ? '#FFFFFF' : '#FF477E',
                      border: openNoteId === activePhoto.id ? '1px solid #FF85A1' : '1px solid #FFD6E0'
                    }}
                    title="Read secret memory note"
                  >
                    <MessageCircle size={12} className={openNoteId === activePhoto.id ? "animate-pulse" : ""} />
                    <span>Secret Note ✏️</span>
                  </button>
                </div>
              </div>

              {/* Hover tiny love sprinkles bubble */}
              <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl animate-bounce">💗</span>
                <span className="text-xl animate-bounce delay-100">🧸</span>
                <span className="text-xl animate-bounce delay-200">💗</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Player bar */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-7 h-7 rounded-full bg-white border border-[#FFD6E0] flex items-center justify-center text-[#FF85A1] hover:bg-[#FFF5F7] cursor-pointer shadow-sm transition-all"
              title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause size={12} className="fill-[#FF85A1]" /> : <Play size={12} className="fill-[#FF85A1]" />}
            </button>

            <div className="flex gap-1.5 px-3 py-1 bg-white border border-[#FFD6E0] rounded-full shadow-sm">
              {photos.map((ph, idx) => (
                <button
                  key={ph.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === idx ? "bg-[#FF85A1] w-6" : "bg-[#FFD6E0] hover:bg-[#FF85A1]/50"
                  }`}
                  title={`View memory ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-[#5D4E6D]/60 font-mono tracking-wider">
            {isAutoPlaying ? "AUTOPLAY ACTIVE • HOVER CARD TO PAUSE" : "AUTOPLAY PAUSED"}
          </div>
        </div>
      </div>

      {/* TWO CHIBI COUPLES CUTTING CAKE ANIMATION */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-6 md:p-8 border-4 border-[#FFD6E0] border-t-8 border-t-[#FF85A1] shadow-xl relative z-20">
        
        {/* Native absolute Confetti Renderer inside box */}
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            initial={{ x: `${c.x}%`, y: `${c.y}%`, opacity: 1, scale: 0.5, rotate: c.spin }}
            animate={{
              y: ["50%", "-10%", "110%"],
              x: [`${c.x}%`, `${c.x + (c.angle / 10)}%`, `${c.x + (c.angle / 5)}%`],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 0.8],
              rotate: c.spin + 720,
            }}
            transition={{
              duration: 2.8,
              delay: c.delay,
              ease: "easeOut",
            }}
            className="absolute pointer-events-none select-none z-40 text-xl font-bold"
            style={{ color: c.color }}
          >
            {Math.random() > 0.6 ? "🌸" : Math.random() > 0.5 ? "💖" : "✨"}
          </motion.div>
        ))}

        {/* Decorative stage headers */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF85A1] text-white font-extrabold font-sans text-xs px-5 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
          <Cake size={13} className="animate-bounce" />
          <span>Kawaii Cake Slicing Stage! 🎂</span>
        </div>

        <div className="text-center mt-3 mb-8">
          <h3 className="font-cursive text-2xl md:text-3xl text-[#5D4E6D] font-bold">
            Two Chibi Couples Celebrating 🎉
          </h3>
          <p className="text-xs font-sans text-[#5D4E6D]/75 mt-1 max-w-md mx-auto">
            Interact with the cake to join Ariyan & Chiya along with the adorable pet companions to slice the grand birthday cake together!
          </p>
        </div>

        {/* Playable Stage Area */}
        <div id="cake-cutting-stage" className="relative h-[250px] w-full rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FFE5D9] border-2 border-dashed border-[#FFD6E0] overflow-hidden flex flex-col justify-end p-4">
          
          {/* Spotlights floating decor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent pointer-events-none" />

          {/* Dynamic Speeches overlay boxes */}
          <AnimatePresence>
            {floatingQuotes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border border-[#FFD6E0] shadow-md z-30 text-center font-sans font-extrabold text-[#FF85A1] text-xs flex items-center justify-center gap-1.5"
              >
                <Sparkle size={12} className="text-yellow-500 animate-spin" />
                <span>{floatingQuotes[floatingQuotes.length - 1]}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage floor line */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[#FFD6E0]/60 rounded-b-xl border-t border-[#FF85A1]/20" />

          {/* GRAND INTERACTIVE 3-TIER CAKE */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            {/* Flickering Candles (We set 18 candles or sweet birthday sparks) */}
            <div className="flex gap-1 mb-[-2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flickering Flame overlay */}
                  {!isBlown ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 0.9, 1.1, 1],
                        y: [0, -1, 1, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + Math.random() * 0.4,
                      }}
                      className="w-1.5 h-3 bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    />
                  ) : (
                    <div className="w-1.5 h-1 bg-stone-500 text-[8px] leading-none animate-pulse">💨</div>
                  )}
                  {/* Candle Stick */}
                  <div className={`w-1 h-3 ${i % 2 === 0 ? "bg-[#FF85A1]" : "bg-[#9D81B1]"} rounded-t-sm`} />
                </div>
              ))}
            </div>

            {/* Cake Tiers Container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={handleCutCakeAction}
              className="cursor-pointer relative flex flex-col items-center group"
            >
              {/* Floating Slice cutout view lines */}
              {cakeCutProgress === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, rotate: -5 }}
                  animate={{ opacity: 1, y: -25, rotate: 5 }}
                  className="absolute bg-white px-2 py-0.5 border border-pink-200 text-[10px] font-bold text-pink-500 rounded-full whitespace-nowrap z-30"
                >
                  🍰 Sliced! Yum!
                </motion.div>
              )}

              {/* Cake Top Tier 3 */}
              <div className="w-16 h-7 bg-[#FFF5F7] rounded-full border-t-[5px] border-t-white border-2 border-[#FFD6E0] shadow-sm relative flex items-center justify-center">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#FF85A1]/20" />
                <span className="text-[9px]">🍓</span>
              </div>

              {/* Cake Mid Tier 2 */}
              <div className="w-24 h-9 bg-[#FFE5D9] rounded-full border-t-[5px] border-t-white border-2 border-[#FFD6E0] shadow-sm relative mt-[-10px]">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#9D81B1]/20" />
                <span className="absolute left-6 top-1">🍓</span>
                <span className="absolute right-6 top-1">🍓</span>
              </div>

              {/* Cake Base Tier 1 */}
              <div className="w-32 h-11 bg-[#E2D1F9] rounded-full border-t-[6px] border-t-white border-2 border-[#FFD6E0] shadow-inner relative mt-[-14px]">
                <div className="absolute top-1/3 left-0 right-0 h-1.5 bg-[#FF85A1]/20" />
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] text-[#5D4E6D]/50 font-bold whitespace-nowrap font-mono">
                  🎂 ARIYAN 18 🎂
                </div>
              </div>

              {/* Cutting knife overlay line */}
              {cakeCutProgress === 1 && (
                <motion.div
                  initial={{ x: -60, rotate: -35, opacity: 0 }}
                  animate={{ x: 0, y: 15, rotate: 30, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-[-20px] left-10 text-3xl z-30 select-none pointer-events-none"
                >
                  🍴
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* CHIBI COUPLE #1 (Ariyan & Chiya Left Couple) */}
          <div className="absolute bottom-3 left-4 md:left-12 flex flex-col items-center z-10">
            {/* Sweet thoughts balloon */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="bg-white px-2 py-1 border border-[#FFD6E0] rounded-xl text-[9px] font-bold text-[#FF85A1] shadow-xs mb-1.5"
            >
              🎉 Special 18!
            </motion.div>

            {/* Couple avatars */}
            <div className="flex gap-1 items-end">
              {/* Girl - Chiya */}
              <motion.div
                animate={cakeCutProgress === 1 ? { y: [0, -10, 0] } : { y: [0, -2, 0], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl relative">
                  👧🏻
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">👑</span>
                </div>
                <span className="text-[8px] px-1 bg-[#FF85A1] text-white rounded font-bold font-mono">Chiya</span>
              </motion.div>

              {/* Boy - Ariyan */}
              <motion.div
                animate={cakeCutProgress === 1 ? { y: [0, -10, 0] } : { y: [0, -3, 0], rotate: [1, -1, 1] }}
                transition={{ repeat: Infinity, duration: 1.0, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl relative">
                  👦🏻
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">🎩</span>
                </div>
                <span className="text-[8px] px-1 bg-[#9D81B1] text-white rounded font-bold font-mono">Ariyan</span>
              </motion.div>
            </div>
            
            <div className="text-[9px] font-bold text-[#5D4E6D]/60 mt-1 uppercase">Party Couple 💕</div>
          </div>

          {/* CHIBI COUPLE #2 (Happy Animal-Ears companion versions Right Couple) */}
          <div className="absolute bottom-3 right-4 md:right-12 flex flex-col items-center z-10">
            {/* Companion thought balloon */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.0 }}
              className="bg-white px-2 py-1 border border-[#FFD6E0] rounded-xl text-[9px] font-bold text-[#9D81B1] shadow-xs mb-1.5"
            >
              🧁 Give Me Cream!
            </motion.div>

            {/* Fluffy companion partners */}
            <div className="flex gap-1 items-end">
              {/* Pet Girl Companion */}
              <motion.div
                animate={{ y: [0, -2, 0], rotate: [1, -1, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl relative">
                  🐱
                  <span className="absolute -top-1.5 right-[-3px] text-xs">🎀</span>
                </div>
                <span className="text-[8px] px-1 bg-pink-400 text-white rounded font-bold font-mono">Neko-Chiya</span>
              </motion.div>

              {/* Pet Boy Companion */}
              <motion.div
                animate={{ y: [0, -3, 0], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 1.1, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl relative">
                  🐶
                  <span className="absolute -top-1.5 left-[-3px] text-xs">👑</span>
                </div>
                <span className="text-[8px] px-1 bg-blue-400 text-white rounded font-bold font-mono">Inu-Ariyan</span>
              </motion.div>
            </div>

            <div className="text-[9px] font-bold text-[#5D4E6D]/60 mt-1 uppercase">Pet Companions 🐾</div>
          </div>

        </div>

        {/* Dynamic description of actions & control buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {cakeCutProgress === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCutCakeAction}
              className="py-2 px-5 rounded-2xl bg-[#FF85A1] hover:bg-[#FF85A1]/95 text-white font-bold text-xs md:text-sm cursor-pointer shadow-md flex items-center gap-1.5 transition-colors border-b-4 border-rose-600/50"
            >
              <span>🔪 Cut Cake Together!</span>
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandlesAction}
                disabled={isBlown}
                className={`py-2 px-4 rounded-2xl font-bold text-xs cursor-pointer shadow-sm flex items-center gap-1.5 border-b-4 transition-colors ${
                  isBlown 
                    ? "bg-slate-100 text-stone-400 border-slate-300 pointer-events-none" 
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                }`}
              >
                <span>🕯️ Blow Candles</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetCakeAction}
                className="py-2 px-4 rounded-2xl bg-[#FFF5F7] border-2 border-[#FFD6E0] text-[#FF85A1] font-bold text-xs cursor-pointer hover:bg-[#FFD6E0]/20"
              >
                <span>🔄 Bake Next Cake</span>
              </motion.button>
            </div>
          )}
        </div>

        <div className="text-center mt-5 text-[10px] text-[#5D4E6D]/50 font-mono uppercase tracking-widest">
          🎈 Sparkles unlock automatically upon cutting • Tap cake directly to slice 🎈
        </div>
      </div>

    </section>
  );
}
