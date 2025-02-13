'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useGame } from '@/lib/contexts/GameContext';
import { COLORS } from '@/styles/colors';

interface StatsProps {
  maxNumber: number;
  onTimeUpdate: (time: string) => void;
}

export default function Stats({ maxNumber, onTimeUpdate }: StatsProps) {
  const { messages } = useLanguage();
  const { isGameStarted, isPaused } = useGame();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isGameStarted) {
      setSeconds(0);
      return;
    }

    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    onTimeUpdate(formatTime(seconds));
  }, [seconds, onTimeUpdate]);

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">{messages.stats.time}:</span>
        <span className="font-mono text-lg font-bold">{formatTime(seconds)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">{messages.stats.lastNumber}:</span>
        <span className={`font-mono text-lg font-bold ${COLORS.CELL.NUMBER}`}>{maxNumber}</span>
      </div>
    </div>
  );
} 