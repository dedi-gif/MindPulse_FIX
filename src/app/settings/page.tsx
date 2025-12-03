"use client";

import { Bell, Moon, Shield, Info, ChevronRight, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const SettingsItem = ({ icon: Icon, title, description, action }: { icon: React.ElementType, title: string, description: string, action: React.ReactNode }) => (
    <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
            <div className="bg-muted p-2 rounded-full">
                <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        {action}
    </div>
);


export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6 animate-in fade-in-50 duration-500">
        <div className="space-y-1">
            <h1 className="text-2xl font-bold font-headline">Pengaturan</h1>
            <p className="text-muted-foreground">Kelola preferensi aplikasi Anda</p>
        </div>

        <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">Preferensi</h2>
            <Card>
                <SettingsItem
                    icon={Bell}
                    title="Notifikasi"
                    description="Pengingat untuk aktivitas harian"
                    action={<Switch defaultChecked />}
                />
                <Separator />
                <SettingsItem
                    icon={Moon}
                    title="Mode Gelap"
                    description="Tampilan dengan latar gelap"
                    action={<Switch />}
                />
            </Card>
        </div>

        <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">Privasi & Keamanan</h2>
            <Card>
                <SettingsItem
                    icon={Shield}
                    title="Privasi Data"
                    description="Kelola data pribadi Anda"
                    action={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                />
            </Card>
        </div>

        <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">Tentang</h2>
            <Card>
                <SettingsItem
                    icon={Info}
                    title="Tentang MindPulse"
                    description="Informasi aplikasi dan teknologi"
                    action={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                />
            </Card>
        </div>

        <div className="flex items-center justify-center pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BrainCircuit className="h-5 w-5" />
                <span>Powered by RNN Technology</span>
            </div>
        </div>

    </div>
  );
}
