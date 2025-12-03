"use client";

import { useState } from "react";
import Image from "next/image";
import { useJournal } from "@/hooks/use-journal-store";
import { getPersonalizedInsightsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { InsightsDisplay } from "@/components/insights/insights-display";
import { Lightbulb, Sparkles } from "lucide-react";

type Insights = {
    insights: string;
    recommendations: string;
} | null;

export default function InsightsPage() {
    const { state } = useJournal();
    const { entries, isInitialized } = state;
    const [isLoading, setIsLoading] = useState(false);
    const [insights, setInsights] = useState<Insights>(null);
    const calmBg = PlaceHolderImages.find(img => img.id === 'calm-background');

    const handleGenerateInsights = async () => {
        setIsLoading(true);
        setInsights(null);
        try {
            const result = await getPersonalizedInsightsAction({ entries });
            setInsights(result);
        } catch (error) {
            console.error("Failed to generate insights:", error);
            // Optionally set an error state to show in the UI
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isInitialized) {
        return <div className="p-4 md:p-6"><Skeleton className="h-64 w-full" /></div>;
    }

    if (entries.length < 3) {
        return (
             <div className="flex flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <CardTitle className="font-headline">Not Enough Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            You need at least 3 journal entries to generate personalized insights. Keep tracking your mood to unlock this feature!
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 space-y-6 animate-in fade-in-50 duration-500">
            {!insights && !isLoading && (
                 <Card className="relative overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-12">
                     {calmBg && (
                         <Image
                            src={calmBg.imageUrl}
                            alt={calmBg.description}
                            fill
                            className="object-cover opacity-20"
                            data-ai-hint={calmBg.imageHint}
                         />
                     )}
                     <div className="relative z-10">
                        <Sparkles className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="text-2xl font-headline mt-4">Unlock Your Mood Insights</CardTitle>
                        <CardDescription className="mt-2 max-w-md mx-auto">
                            Our AI will analyze your mood and journal entries to uncover patterns and provide personalized recommendations for your well-being.
                        </CardDescription>
                        <Button onClick={handleGenerateInsights} size="lg" className="mt-6">
                            <Lightbulb className="mr-2 h-5 w-5" />
                            Generate My Insights
                        </Button>
                     </div>
                 </Card>
            )}

            {isLoading && (
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            )}

            {insights && (
                <InsightsDisplay insightsData={insights} onRegenerate={handleGenerateInsights} />
            )}
        </div>
    );
}
