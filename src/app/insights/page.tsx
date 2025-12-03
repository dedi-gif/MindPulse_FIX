
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Heart, Square, Activity } from 'lucide-react';
import { cn } from "@/lib/utils";
import React from 'react';


const ActivitySection = ({ icon, title, color, children }: { icon: React.ElementType, title: string, color: string, children: React.ReactNode }) => {
    return (
        <div className="space-y-3">
            <Card className={cn("p-4", color)}>
                <div className="flex items-center gap-3">
                    {React.createElement(icon, { className: "h-6 w-6 text-current" })}
                    <div>
                        <h2 className="font-bold">{title}</h2>
                        <p className="text-sm opacity-80">Berdasarkan pola emosi Anda</p>
                    </div>
                </div>
            </Card>
            {children}
        </div>
    );
}

const ActivityCard = ({ title, description, time }: { title: string, description: string, time: string }) => {
    return (
        <Card className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">{time}</Badge>
            </div>
        </Card>
    );
}


export default function ActivitiesPage() {
    return (
        <div className="p-4 md:p-6 space-y-6 bg-background">
            <div>
                <h1 className="text-2xl font-bold font-headline">Aktivitas & Intervensi</h1>
                <p className="text-muted-foreground">Rekomendasi yang dipersonalisasi untuk Anda</p>
            </div>

            <div className="space-y-6">
                <ActivitySection icon={SlidersHorizontal} title="Mengatasi Kecemasan" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                    <div className="space-y-3">
                        <ActivityCard 
                            title="Teknik Pernapasan 4-7-8" 
                            description="Teknik pernapasan yang membantu menenangkan sistem saraf" 
                            time="5 menit" 
                        />
                        <ActivityCard 
                            title="Teknik Grounding 5-4-3-2-1" 
                            description="Latihan untuk membawa kesadaran ke saat ini" 
                            time="10 menit" 
                        />
                    </div>
                </ActivitySection>

                <ActivitySection icon={Heart} title="Peningkatan Fokus" color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                     <div className="space-y-3">
                        <ActivityCard 
                            title="Meditasi Mindfulness" 
                            description="Meditasi untuk meningkatkan konsentrasi dan ketenangan" 
                            time="15 menit" 
                        />
                        <ActivityCard 
                            title="Jurnal Syukur" 
                            description="Menulis hal-hal yang Anda syukuri untuk meningkatkan suasana hati" 
                            time="10 menit" 
                        />
                    </div>
                </ActivitySection>

                <ActivitySection icon={Activity} title="Reduksi Stres" color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                     <div className="space-y-3">
                        <ActivityCard 
                            title="Relaksasi Otot Progresif" 
                            description="" 
                            time="20 menit" 
                        />
                    </div>
                </ActivitySection>
            </div>
        </div>
    );
}

