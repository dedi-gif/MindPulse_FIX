"use client";

import { format } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { MOOD_MAPPING } from '@/lib/constants';
import type { JournalEntry } from '@/lib/types';

interface MoodHistoryChartProps {
  entries: JournalEntry[];
}

const chartConfig = {
  moodValue: {
    label: 'Mood',
  },
} satisfies ChartConfig;

const moodTicks = [
    {value: 1, label: 'Sad'},
    {value: 2, label: 'Anxious'},
    {value: 3, label: 'Calm'},
    {value: 4, label: 'Energetic'},
    {value: 5, label: 'Happy'},
]

export function MoodHistoryChart({ entries }: MoodHistoryChartProps) {
  const chartData = entries.map((entry) => ({
    date: format(new Date(entry.date), 'MMM d'),
    moodValue: MOOD_MAPPING[entry.mood]?.value || 0,
    fill: MOOD_MAPPING[entry.mood]?.color || 'hsl(var(--foreground))',
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis 
            domain={[0.5, 5.5]}
            ticks={moodTicks.map(t => t.value)}
            tickFormatter={(value) => moodTicks.find(t => t.value === value)?.label ?? ''}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <defs>
          <linearGradient id="fillMood" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-moodValue, hsl(var(--primary)))"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-moodValue, hsl(var(--primary)))"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="moodValue"
          type="natural"
          fill="url(#fillMood)"
          stroke="hsl(var(--primary))"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
