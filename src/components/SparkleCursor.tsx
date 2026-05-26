import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  char: string;
}

const COLORS = ["#fb7185", "#f43f5e", "#ec4899", "#fbcfe8", "#f472b6", "#a78bfa", "#fde047"];
const CHARS = ["❤️", "✨", "🌸", "⭐", "💖", "💫"];

export default function SparkleCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handlePointerMove = (e: PointerEvent) => {
      // Throttle sparkle creation slightly
      if (Math.random() > 0.4) return;

      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
      const randomSize = Math.random() * 20 + 12; // 12px to 32px

      const newSparkle: Sparkle = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        color: randomColor,
        size: randomSize,
        char: randomChar,
      };

      setSparkles((prev) => [...prev.slice(-30), newSparkle]); // keep max 30 sparkles
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Filter out expired sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0.5, x: s.x - s.size / 2, y: s.y - s.size / 2 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: s.y + (Math.random() * 60 - 30) + 40, // float downwards
              x: s.x + (Math.random() * 40 - 20),
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              fontSize: `${s.size}px`,
              textShadow: `0 0 6px ${s.color}`,
              userSelect: "none",
            }}
          >
            {s.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
