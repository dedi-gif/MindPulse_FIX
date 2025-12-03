"use client";

import { useState } from 'react';
import type { MoodOption } from '@/lib/types';
import { MoodSelector } from '@/components/dashboard/mood-selector';
import { JournalingSection } from '@/components/dashboard/journaling-section';

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood);
  };

  const handleJournalingComplete = () => {
    setSelectedMood(null);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        {!selectedMood ? (
          <>
            <h1 className="text-3xl font-bold text-center font-headline tracking-tight text-foreground/90">
              How are you feeling today?
            </h1>
            <p className="text-center text-muted-foreground mt-2 mb-8">
              Select a mood to start your daily check-in.
            </p>
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </>
        ) : (
          <JournalingSection
            mood={selectedMood}
            onComplete={handleJournalingComplete}
          />
        )}
      </div>
    </div>
  );
}
