'use client';

import { useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  mode: 'work' | 'break';
  totalTime: number;
  onToggle: () => void;
  onReset: () => void;
}

export function Timer({
  timeLeft,
  isRunning,
  mode,
  totalTime,
  onToggle,
  onReset,
}: TimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const getProgressColor = (timeLeft: number, totalTime: number) => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 60) return 'bg-emerald-500 dark:bg-emerald-600'; // Calming green for focused work
    if (percentage > 20) return 'bg-sky-500 dark:bg-sky-600'; // Neutral blue for steady progress
    if (percentage > 8) return 'bg-amber-500 dark:bg-amber-600'; // Gentle warning yellow
    return 'bg-rose-500 dark:bg-rose-600'; // Urgent red for final countdown
  };

  return (
    <Card className="p-8 sm:p-12 text-center shadow-lg border-2 bg-gradient-to-b from-background to-muted/20">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {mode === 'work' ? 'Focus Time' : 'Break Time'}
          </h2>
          <div className="text-6xl sm:text-8xl font-bold mb-6 text-primary tracking-tight">
            {formatTime(timeLeft)}
          </div>
        </div>
        <Progress
          value={(timeLeft / totalTime) * 100}
          className={cn(
            'h-3 transition-colors duration-300',
            getProgressColor(timeLeft, totalTime)
          )}
        />
        <div className="flex justify-center items-center flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <Button onClick={onToggle} size="lg" className="w-36 h-12 text-lg">
            {isRunning ? (
              <Pause className="mr-2 h-6 w-6" />
            ) : (
              <Play className="mr-2 h-6 w-6" />
            )}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="w-36 h-12 text-lg"
          >
            <RotateCcw className="mr-2 h-6 w-6" /> Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
