import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppShell } from '@/components/app-shell';
import { JournalProvider } from '@/hooks/use-journal-store';

export const metadata: Metadata = {
  title: 'MindPulse',
  description: 'Sistem Kesehatan Mental Anda',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <JournalProvider>
          <AppShell>{children}</AppShell>
        </JournalProvider>
        <Toaster />
      </body>
    </html>
  );
}
