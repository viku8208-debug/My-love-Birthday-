import { useState, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen";
import SparkleCursor from "./components/SparkleCursor";
import VinylPlayer, { VinylPlayerRef } from "./components/VinylPlayer";
import IntroSection from "./components/IntroSection";
import TimelineSection from "./components/TimelineSection";
import ChibiSection from "./components/ChibiSection";
import LetterSection from "./components/LetterSection";
import GallerySection from "./components/GallerySection";
import FinalSection from "./components/FinalSection";

// String reference paths to avoid TypeScript static import module complaints on binary assets
const COUPLE_IMAGE = "/src/assets/images/chibi_couple_cozy_1779721174092.png";
const CAT_IMAGE = "/src/assets/images/cuddling_cats_1779721194594.png";

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const playerRef = useRef<VinylPlayerRef | null>(null);

  const handleEnterWorld = () => {
    setIsEntered(true);
    // Give browser audio context enough millisecond buffer to unlock and play smoothly
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.play();
      }
    }, 150);
  };

  if (!isEntered) {
    return <LoadingScreen onEnter={handleEnterWorld} />;
  }

  return (
    <div id="scrapbook-diary-applet" className="min-h-screen relative w-full bg-[#FFF5F7] selection:bg-pink-250 select-none overflow-x-hidden">
      {/* Interactive Cursor sparkles trail following user pointer moves */}
      <SparkleCursor />

      {/* Floating global Jukebox Vinyl Player */}
      <VinylPlayer ref={playerRef} isInitiallyPlaying={true} />

      {/* SECTION 1 - Cinematic Intro Billboard */}
      <IntroSection coupleImage={COUPLE_IMAGE} catImage={CAT_IMAGE} />

      {/* SECTION 2 - Romantic Memory Timeline */}
      <TimelineSection />

      {/* SECTION 3 - Secret Chibi City (Interactive Mini Game) */}
      <ChibiSection />

      {/* SECTION 4 - Sacred Handwritten Lover Letter envelope */}
      <LetterSection />

      {/* SECTION 5 - Curated Polaroid Gallery */}
      <GallerySection coupleImage={COUPLE_IMAGE} catImage={CAT_IMAGE} />

      {/* SECTION 6 - Grand Fireworks Finale and Replay */}
      <FinalSection />
    </div>
  );
}
