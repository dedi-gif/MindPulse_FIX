import type { LucideIcon } from 'lucide-react';

export type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic';

export type MoodOption = {
  mood: Mood;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

export type JournalEntry = {
  id: string;
  date: string; // ISO string
  mood: Mood;
  text: string;
};
