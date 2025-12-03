import { Smile, Frown, Meh, Wind, Zap } from 'lucide-react';
import type { MoodOption } from './types';

export const MOOD_OPTIONS: MoodOption[] = [
  {
    mood: 'happy',
    label: 'Happy',
    icon: Smile,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
  },
  {
    mood: 'calm',
    label: 'Calm',
    icon: Wind,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    mood: 'energetic',
    label: 'Energetic',
    icon: Zap,
    color: 'text-chart-5',
    bgColor: 'bg-chart-5/10',
  },
  {
    mood: 'anxious',
    label: 'Anxious',
    icon: Meh,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
  {
    mood: 'sad',
    label: 'Sad',
    icon: Frown,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
  },
];

export const MOOD_MAPPING: Record<
  string,
  { value: number; color: string }
> = {
  happy: { value: 5, color: 'hsl(var(--chart-1))' },
  energetic: { value: 4, color: 'hsl(var(--chart-5))' },
  calm: { value: 3, color: 'hsl(var(--chart-3))' },
  anxious: { value: 2, color: 'hsl(var(--chart-4))' },
  sad: { value: 1, color: 'hsl(var(--chart-2))' },
};
