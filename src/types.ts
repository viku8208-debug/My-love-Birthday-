export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  doodleType: "heart" | "star" | "cat" | "chat" | "sparkles" | "fight";
  tag: string;
  emoji: string;
  bgColor: string;
}

export interface ChibiClickable {
  id: string;
  name: string;
  emoji: string;
  x: number; // percentage width
  y: number; // percentage height
  dialog: string;
  reactionType: "heartRain" | "starBurst" | "catMeow" | "sparkleStream" | "dance";
}

export interface PolaroidPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageAlt: string;
  bgColor: string;
  sticker: "heart" | "cat" | "flower" | "star" | "crown";
  rotation: number; // tilt angle in degrees
}
