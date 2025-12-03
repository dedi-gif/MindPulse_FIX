"use client";

import { MOOD_OPTIONS } from '@/lib/constants';
import type { MoodOption } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MoodSelectorProps = {
  onMoodSelect: (mood: MoodOption) => void;
};

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {MOOD_OPTIONS.map((mood) => (
        <Card
          key={mood.mood}
          onClick={() => onMoodSelect(mood)}
          className={cn(
            'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
            mood.bgColor
          )}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
            <mood.icon className={cn('size-10', mood.color)} />
            <span className={cn('font-medium', mood.color)}>
              {mood.label}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
