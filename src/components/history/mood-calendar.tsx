"use client";

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { JournalEntry } from '@/lib/types';
import { MOOD_OPTIONS } from '@/lib/constants';

import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MoodCalendarProps {
  entries: JournalEntry[];
}

export function MoodCalendar({ entries }: MoodCalendarProps) {
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(
    null
  );

  const moodModifiers = entries.reduce(
    (acc, entry) => {
      const date = new Date(entry.date);
      if (!acc[entry.mood]) {
        acc[entry.mood] = [];
      }
      acc[entry.mood].push(date);
      return acc;
    },
    {} as Record<string, Date[]>
  );

  const moodModifiersStyles = MOOD_OPTIONS.reduce(
    (acc, option) => {
      acc[option.mood] = {
        backgroundColor: `hsl(var(--${option.color.replace('text-', '')}))`,
        color: 'hsl(var(--primary-foreground))',
        opacity: 0.8,
      };
      return acc;
    },
    {} as Record<string, React.CSSProperties>
  );

  const handleDayClick = (day: Date) => {
    const entry = entries.find(
      (e) => format(new Date(e.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    if (entry) {
      setSelectedEntry(entry);
    }
  };

  const moodForSelected = selectedEntry
    ? MOOD_OPTIONS.find((m) => m.mood === selectedEntry.mood)
    : null;

  return (
    <>
      <Calendar
        mode="single"
        modifiers={moodModifiers}
        modifiersStyles={moodModifiersStyles}
        onDayClick={handleDayClick}
        className="rounded-md border w-full"
      />
      <Dialog
        open={!!selectedEntry}
        onOpenChange={(isOpen) => !isOpen && setSelectedEntry(null)}
      >
        <DialogContent>
          {selectedEntry && moodForSelected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Entry for {format(new Date(selectedEntry.date), 'MMMM d, yyyy')}</span>
                  <Badge
                    className={cn(moodForSelected.bgColor, moodForSelected.color, 'border-none')}
                  >
                     <moodForSelected.icon className="mr-2 h-4 w-4" />
                    {moodForSelected.label}
                  </Badge>
                </DialogTitle>
                 <DialogDescription>
                    Your thoughts and feelings from this day.
                </DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto rounded-md bg-muted/50 p-4">
                <p>{selectedEntry.text}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
