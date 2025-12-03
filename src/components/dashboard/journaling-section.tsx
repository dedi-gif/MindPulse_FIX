"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useJournal } from '@/hooks/use-journal-store';
import type { MoodOption } from '@/lib/types';
import { getJournalingPromptsAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Book, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  journalText: z.string().min(10, {
    message: 'Please share a little more about your feelings.',
  }),
});

type JournalingSectionProps = {
  mood: MoodOption;
  onComplete: () => void;
};

export function JournalingSection({ mood, onComplete }: JournalingSectionProps) {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const { addEntry } = useJournal();

  useEffect(() => {
    const fetchPrompts = async () => {
      setIsLoadingPrompts(true);
      try {
        const fetchedPrompts = await getJournalingPromptsAction({
          mood: mood.mood,
        });
        setPrompts(fetchedPrompts);
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setIsLoadingPrompts(false);
      }
    };
    fetchPrompts();
  }, [mood.mood]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journalText: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addEntry({
      mood: mood.mood,
      text: values.journalText,
    });
    toast({
      title: 'Entry Saved',
      description: 'Your mood and journal have been recorded.',
    });
    onComplete();
  }

  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={cn('p-3 rounded-lg', mood.bgColor)}>
            <mood.icon className={cn('size-8', mood.color)} />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">
              Tell me more about feeling {mood.label}
            </CardTitle>
            <CardDescription>
              Expand on your feelings. Use the prompts for inspiration.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-semibold text-foreground/80">
                <Lightbulb className="size-5 text-chart-4" />
                AI Journaling Prompts
              </h3>
              {isLoadingPrompts ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : prompts.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {prompts.map((prompt, index) => (
                    <li key={index}>{prompt}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No prompts available right now. Feel free to write what's on your mind.
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="journalText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-semibold text-foreground/80">
                    <Book className="size-5 text-primary" />
                    Your Journal Entry
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about your day, your thoughts, your feelings..."
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onComplete}>
              Cancel
            </Button>
            <Button type="submit">Save Entry</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
