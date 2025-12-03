"use client";

import { useJournal } from "@/hooks/use-journal-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoodCalendar } from "@/components/history/mood-calendar";
import { MoodHistoryChart } from "@/components/history/mood-history-chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryPage() {
  const { state } = useJournal();
  const { entries, isInitialized } = state;

  if (!isInitialized) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-in fade-in-50 duration-500">
      {entries.length === 0 ? (
        <Card className="flex flex-col items-center justify-center text-center p-12">
            <CardTitle className="text-2xl font-headline">Belum Ada Riwayat</CardTitle>
            <CardDescription className="mt-2">
                Mulailah dengan mencatat suasana hati Anda di halaman Beranda.
            </CardDescription>
        </Card>
      ) : (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Kalender Suasana Hati</CardTitle>
                    <CardDescription>Riwayat suasana hati Anda dalam sekejap. Klik satu hari untuk melihat detailnya.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MoodCalendar entries={entries} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Tren Suasana Hati</CardTitle>
                    <CardDescription>Fluktuasi suasana hati Anda selama 30 entri terakhir.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MoodHistoryChart entries={entries.slice(-30)} />
                </CardContent>
            </Card>
        </>
      )}
    </div>
  );
}
