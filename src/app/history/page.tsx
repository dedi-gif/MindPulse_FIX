
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, Save } from 'lucide-react';

import { useJournal } from '@/hooks/use-journal-store';
import { MOOD_OPTIONS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import type { Mood, JournalEntry as JournalEntryType } from '@/lib/types';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

const journalSchema = z.object({
  reflection: z.string().min(1, 'Refleksi tidak boleh kosong.'),
  feeling: z.number().min(1).max(5),
});

type JournalFormData = z.infer<typeof journalSchema>;

const moodMapping: Mood[] = ['sad', 'anxious', 'calm', 'energetic', 'happy'];
const moodValueMap: Record<Mood, number> = {
    'sad': 1,
    'anxious': 2,
    'calm': 3,
    'energetic': 4,
    'happy': 5,
};


const PreviousEntryCard = ({ entry }: { entry: JournalEntryType }) => {
  const moodOption = MOOD_OPTIONS.find(m => m.mood === entry.mood);
  return (
    <Card className="bg-muted/50">
        <CardContent className="p-4">
            <div className="flex items-center gap-3">
                {moodOption && <moodOption.icon className={cn("h-8 w-8", moodOption.color)} />}
                <div>
                    <p className="font-semibold text-sm">{format(new Date(entry.date), 'EEEE, d MMM yyyy', { locale: id })}</p>
                    <p className="text-muted-foreground text-sm truncate">{entry.text}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  );
};


export default function JournalPage() {
  const { state, addEntry } = useJournal();
  const { entries } = state;
  const [selectedMood, setSelectedMood] = useState<Mood>('calm');
  const [charCount, setCharCount] = useState(0);

  const form = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      reflection: '',
      feeling: 3,
    },
  });

  const onSubmit = (data: JournalFormData) => {
    addEntry({
      mood: selectedMood,
      text: data.reflection,
    });
    toast({
      title: 'Entri Disimpan',
      description: 'Jurnal harian Anda telah berhasil disimpan.',
    });
    form.reset();
    setCharCount(0);
  };
  
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Jurnal Harian</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })}</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="font-semibold mb-3">Bagaimana Perasaan Anda Hari Ini?</h2>
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <div
                  key={mood.mood}
                  onClick={() => {
                    setSelectedMood(mood.mood)
                    form.setValue('feeling', moodValueMap[mood.mood])
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedMood === mood.mood ? 'border-primary bg-primary/10' : 'border-transparent bg-muted/50 hover:bg-muted'
                  )}
                >
                  <mood.icon className={cn("h-8 w-8", mood.color)} />
                  <span className="text-xs font-bold">{moodValueMap[mood.mood]}</span>
                </div>
              ))}
            </div>
             <Controller
                name="feeling"
                control={form.control}
                render={({ field }) => (
                    <div className="mt-4">
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => {
                                field.onChange(value[0]);
                                const moodIndex = Math.max(0, Math.min(4, Math.round(value[0]) - 1));
                                setSelectedMood(moodMapping[moodIndex]);
                            }}
                            min={1}
                            max={5}
                            step={0.1}
                        />
                         <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Buruk</span>
                            <span>Baik</span>
                        </div>
                    </div>
                )}
            />
          </div>

          <FormField
            control={form.control}
            name="reflection"
            render={({ field }) => (
              <FormItem>
                 <h2 className="font-semibold mb-2">Refleksi Harian</h2>
                <Textarea
                  {...field}
                  placeholder="Tulis apa yang Anda rasakan hari ini... Apa yang membuat Anda senang? Apa yang menjadi tantangan?"
                  className="min-h-[120px] bg-muted/50"
                  onChange={(e) => {
                    field.onChange(e);
                    setCharCount(e.target.value.length);
                  }}
                />
                 <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <FormMessage />
                    <span>{charCount} karakter</span>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Simpan Entri
          </Button>
        </form>
      </Form>
      
      {sortedEntries.length > 0 && (
          <div className="space-y-4">
              <h2 className="font-semibold">Entri Sebelumnya</h2>
              {sortedEntries.slice(0, 3).map(entry => (
                  <PreviousEntryCard key={entry.id} entry={entry} />
              ))}
          </div>
      )}

    </div>
  );
}
