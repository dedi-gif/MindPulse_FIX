"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Lightbulb, RefreshCw } from 'lucide-react';

type InsightsDisplayProps = {
  insightsData: {
    insights: string;
    recommendations: string;
  };
  onRegenerate: () => void;
};

export function InsightsDisplay({ insightsData, onRegenerate }: InsightsDisplayProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <span className="p-2 bg-accent rounded-full">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </span>
            <div>
              <CardTitle className="font-headline text-xl">Your Mood Patterns</CardTitle>
              <CardDescription>
                Here's what our AI discovered from your entries.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>{insightsData.insights}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
           <div className="flex items-start gap-4">
            <span className="p-2 bg-accent rounded-full">
              <Lightbulb className="h-6 w-6 text-chart-4" />
            </span>
            <div>
              <CardTitle className="font-headline text-xl">Personalized Recommendations</CardTitle>
              <CardDescription>
                Actionable advice to enhance your well-being.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>{insightsData.recommendations}</p>
          </div>
        </CardContent>
         <CardFooter>
            <Button onClick={onRegenerate} variant="outline" className="ml-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate Insights
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
