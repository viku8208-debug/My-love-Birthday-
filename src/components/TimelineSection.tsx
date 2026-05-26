import { motion } from "motion/react";
import { Heart, Sparkles, Quote } from "lucide-react";

interface TimelineCard {
  id: string;
  title: string;
  date: string;
  description: string;
  emoji: string;
  tag: string;
  sticker: "heart" | "star" | "match" | "pins" | "sparkles";
  stickerColor: string;
}

const STORY_DATA: TimelineCard[] = [
  {
    id: "meet",
    title: "How We First Met 🤍",
    date: "A serendipitous meeting",
    description: "We met on HelloTalk VR as complete strangers… random si baat hui thi, but pata nahi kyun us din se everything started feeling special 🤍 It felt so natural talking to you, like somehow we already knew each other before. That one random conversation slowly became something really precious 🥹✨",
    emoji: "✨",
    tag: "Unexpected Beginning",
    sticker: "pins",
    stickerColor: "bg-amber-100"
  },
  {
    id: "chat",
    title: "Those Afternoon Chats 🫶",
    date: "Every single day",
    description: "First night se hi aisa laga jaise hum already best friends ho. Ham itni baatein karte the ki time ka pata hi nahi chalta tha 😭🤍 Afternoon chats became my favorite part of the day. Tumhara notification dekhte hi automatically smile aa jati thi hehe ✨",
    emoji: "💌",
    tag: "Endless Conversations",
    sticker: "heart",
    stickerColor: "bg-rose-100"
  },
  {
    id: "calls",
    title: "Our Video Calls 🥹",
    date: "Uncountable sweet minutes",
    description: "Aur video calls… literally my favorite moments 😭 Uska face dekhte rehna, uske cute expressions pe hasna, bina reason smile karna… those moments feel so warm and comforting 🤍 Even silence during calls felt special somehow ✨",
    emoji: "🎥",
    tag: "Warmest Moments",
    sticker: "sparkles",
    stickerColor: "bg-purple-100"
  },
  {
    id: "chaos",
    title: "Suar & Bandariya Energy 🐷🐵",
    date: "Stupidly cute nicknames",
    description: "Hamari funniest memories bhi bohot cute hain 😭 Main usko “suar” bulati hu aur woh mujhe “bandariya” 😂🤍 Pata nahi kaise, but these weird nicknames became our love language hehe. Honestly it’s stupidly cute 😭✨",
    emoji: "🐷",
    tag: "Chaos & Love",
    sticker: "star",
    stickerColor: "bg-yellow-100"
  },
  {
    id: "fights",
    title: "From Strangers to Someone Special 🤍",
    date: "Our beautiful path",
    description: "Aur hamari silly fights 😭 Choti choti baaton pe naraz hona, baat na ho to sad hona, ek dusre ke nakhre uthana… but end me phir wahi hasi aur pyaar bhari baatein 🥹✨ Honestly, strangers se someone special banne ka journey bohot unexpectedly beautiful tha 🤍",
    emoji: "🌙",
    tag: "Soft Little Fights",
    sticker: "match",
    stickerColor: "bg-blue-100"
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-20 px-4 md:px-8 bg-[#FFF5F7] border-y-2 border-[#FFD6E0] select-none overflow-hidden pb-28">
      {/* Dynamic Background decor */}
      <div className="absolute top-20 right-4 w-32 h-32 bg-[#FFD6E0]/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-16 left-4 w-40 h-40 bg-[#E2D1F9]/50 rounded-full blur-2xl pointer-events-none" />

      {/* Title block */}
      <div className="max-w-xl mx-auto text-center mb-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#FF85A1] text-xs font-bold font-sans tracking-wide mb-3"
        >
          <Sparkles size={11} className="fill-amber-400 text-amber-500 animate-spin" />
          <span>SCRAPBOOK OF US</span>
        </motion.div>

        <h2 className="font-cursive text-4xl md:text-5xl text-[#FF85A1] font-bold mb-3">
          Our Special Timeline 📖
        </h2>
        
        <p className="font-sans text-[#5D4E6D]/80 text-sm md:text-base px-2">
          From the clumsy awkward start to being completely inseparable. Drag or hover to see hearts dance!
        </p>
      </div>

      {/* Main Timeline body */}
      <div className="max-w-6xl mx-auto relative pl-6 md:pl-0">
        
        {/* Middle Line tracker */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 bg-dashed bg-[#FFD6E0] -translate-x-1/2 pointer-events-none select-none" />

        {/* Story Elements list */}
        <div className="space-y-16 md:space-y-24">
          {STORY_DATA.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center w-full min-h-[220px] ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline Center Badge (Icon dot) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    className="w-10 h-10 bg-[#FF85A1] hover:bg-[#FF85A1]/90 text-white rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white cursor-pointer"
                  >
                    {item.emoji}
                  </motion.div>
                </div>

                {/* Floating Card Sparkles */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
                  <motion.div
                    animate={{ 
                      y: [-8, 8, -8],
                      x: [-4, 4, -4],
                      rotate: [0, 180, 0],
                      scale: [0.8, 1.2, 0.8] 
                    }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                    className="absolute top-4 left-[-15px] text-lg"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [10, -10, 10],
                      x: [5, -5, 5],
                      rotate: [360, 0, 360],
                      scale: [1, 0.7, 1] 
                    }}
                    transition={{ repeat: Infinity, duration: 5, delay: idx * 0.8 }}
                    className="absolute -bottom-6 right-[-10px] text-lg"
                  >
                    🌸
                  </motion.div>
                </div>

                {/* Sub Card content frame - Rule line looseleaf texture + gorgeous pastel shadows */}
                <motion.div
                  initial="hidden"
                  whileHover="hover"
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.92 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                    hover: { 
                      scale: 1.05, 
                      rotate: isLeft ? -1.8 : 1.8,
                      boxShadow: "0 25px 50px -10px rgba(255,133,161,0.28)"
                    }
                  }}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.15 }}
                  style={{ 
                    backgroundImage: "radial-gradient(#FFD6E0 1.2px, transparent 1.2px)", 
                    backgroundSize: "16px 16px",
                    backgroundColor: "#FCFDF9"
                  }}
                  className={`w-full md:w-[45%] p-5 rounded-3xl shadow-[0_15px_35px_-5px_rgba(255,182,193,0.15)] border-2 border-[#FFD6E0] border-t-8 border-t-[#FF85A1] relative ${
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  {/* Adhesive tape style decoration */}
                  <div
                    className={`absolute -top-3.5 px-3 py-1 text-[10px] text-[#5D4E6D] font-mono tracking-widest text-center shadow-sm w-44 border-x border-[#FF85A1]/40 rounded ${
                      item.stickerColor
                    } ${isLeft ? "left-6 -rotate-6" : "right-10 rotate-6"}`}
                  >
                    ⭐ {item.tag}
                  </div>

                  {/* Corner Heart stamp & tiny hover burst */}
                  <div className="absolute bottom-3 right-4 flex gap-1 pointer-events-none select-none">
                    <motion.span 
                      variants={{
                        hover: { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }
                      }}
                      className="text-xl inline-block"
                    >
                      💖
                    </motion.span>
                    <motion.span 
                      variants={{
                        hidden: { opacity: 0, scale: 0, y: 0, x: 0 },
                        hover: { opacity: [0, 1, 0], scale: [0, 1, 0.5], y: -25, x: 10 }
                      }}
                      className="absolute text-xs"
                    >
                      💗
                    </motion.span>
                    <motion.span 
                      variants={{
                        hidden: { opacity: 0, scale: 0, y: 0, x: 0 },
                        hover: { opacity: [0, 1, 0], scale: [0, 1.2, 0.4], y: -30, x: -15 }
                      }}
                      transition={{ delay: 0.05 }}
                      className="absolute text-xs"
                    >
                      ❤️
                    </motion.span>
                    <motion.span 
                      variants={{
                        hidden: { opacity: 0, scale: 0, y: 0, x: 0 },
                        hover: { opacity: [0, 1, 0], scale: [0, 0.9, 0.3], y: -20, x: -5 }
                      }}
                      transition={{ delay: 0.1 }}
                      className="absolute text-xs"
                    >
                      💕
                    </motion.span>
                  </div>

                  <div className="pt-2">
                    {/* Timestamp badge */}
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF85A1] block mb-1">
                      {item.date}
                    </span>
                    
                    {/* Story Title with soft glows & cute stickers */}
                    <motion.h3
                      animate={{
                        textShadow: [
                          "0 0 1px rgba(255,133,161,0)",
                          "0 0 10px rgba(255,133,161,0.4)",
                          "0 0 1px rgba(255,133,161,0)"
                        ]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + idx,
                        ease: "easeInOut"
                      }}
                      className="font-cursive text-xl md:text-2xl text-[#FF85A1] leading-snug font-bold mb-2 flex items-center gap-1.5"
                    >
                      <span>{item.title}</span>
                      <span className="text-sm select-none animate-bounce">
                        {idx === 0 && "🧸"}
                        {idx === 1 && "🍭"}
                        {idx === 2 && "🥞"}
                        {idx === 3 && "🐵"}
                        {idx === 4 && "🎀"}
                      </span>
                    </motion.h3>
                    
                    {/* Paragraph body */}
                    <div className="text-[#5D4E6D] text-xs md:text-sm leading-relaxed relative bg-[#FFF5F7]/90 p-3 rounded-2xl border border-[#FFD6E0]/40">
                      <Quote className="absolute -top-2.5 -left-1 text-pink-200 scale-75" />
                      <p className="pl-4 italic whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>

                  {/* Aesthetic stamp marker */}
                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-dashed border-[#FFD6E0] text-[10px] font-mono text-[#5D4E6D]/50">
                    <span>MOMENT #{idx + 1}</span>
                    <span className="text-[#FF85A1] font-extrabold flex items-center gap-1">
                      <Heart className="fill-[#FF85A1] inline" size={10} /> Always yours
                    </span>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
