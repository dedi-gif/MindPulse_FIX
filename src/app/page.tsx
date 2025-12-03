
"use client";

import { BrainCircuit, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useJournal } from "@/hooks/use-journal-store";
import { MoodHistoryChart } from "@/components/history/mood-history-chart";
import { Mood } from '@/lib/types';


const EmotionStatusCard = () => (
    <Card className="bg-yellow-100/50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
            <CardTitle className="text-base font-semibold">Status Emosi Terkini</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex flex-col items-center gap-2">
            <span className="text-5xl">😌</span>
            <p className="font-bold text-lg text-yellow-800 dark:text-yellow-300">Stres Ringan</p>
            <p className="text-xs text-muted-foreground">Terdeteksi oleh analisis RNN</p>
        </CardContent>
    </Card>
);

const RecommendationCard = () => (
    <Card className="bg-blue-500 text-white border-none">
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Lakukan Teknik Pernapasan 4-7-8</h3>
                    <p className="text-sm opacity-90 max-w-xs">Sistem mendeteksi pola stres dalam aktivitas Anda. Teknik ini dapat membantu menenangkan sistem saraf.</p>
                </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-white text-blue-500 hover:bg-gray-100 hover:text-blue-600">
                Mulai Sekarang
            </Button>
        </CardContent>
    </Card>
);

const EmotionPatternChart = () => {
    const { state } = useJournal();
    const { entries } = state;
    
    // Create dummy data for 7 days if no entries exist
    const last7DaysData = entries.length > 0 ? entries.slice(-7) : Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const moods: Mood[] = ['sad', 'anxious', 'calm', 'energetic', 'happy'];
        return {
            id: `dummy-${i}`,
            date: d.toISOString(),
            mood: moods[Math.floor(Math.random() * moods.length)],
            text: 'Dummy entry'
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <TrendingUp className="h-5 w-5" />
                    Pola Emosi (7 Hari)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MoodHistoryChart entries={last7DaysData} />
            </CardContent>
        </Card>
    );
};


export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
        <div className='flex items-center gap-3'>
            <BrainCircuit className="w-8 h-8 text-primary" />
            <div>
                <h1 className="text-xl font-bold font-headline">MindPulse</h1>
                <p className="text-muted-foreground text-sm">Sistem Kesehatan Mental Anda</p>
            </div>
        </div>

        <EmotionStatusCard />
        
        <div>
             <h2 className="text-base font-semibold flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Rekomendasi untuk Anda
            </h2>
            <RecommendationCard />
        </div>

        <EmotionPatternChart />
    </div>
  );
}
