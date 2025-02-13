'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  maxNumber: number;
  setMaxNumber: (number: number) => void;
  handleClear: () => void;
  clickOrder: { row: number; col: number; number: number; }[];
  setClickOrder: (order: { row: number; col: number; number: number; }[]) => void;
  nextNumber: number;
  setNextNumber: (number: number) => void;
  isGameStarted: boolean;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [maxNumber, setMaxNumber] = useState(0);
  const [clickOrder, setClickOrder] = useState<{ row: number; col: number; number: number; }[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const handleClear = () => {
    setClickOrder([]);
    setNextNumber(1);
    setMaxNumber(0);
    setIsPaused(false);
  };

  const isGameStarted = clickOrder.length > 0;

  return (
    <GameContext.Provider value={{ 
      maxNumber, 
      setMaxNumber, 
      handleClear,
      clickOrder,
      setClickOrder,
      nextNumber,
      setNextNumber,
      isGameStarted,
      isPaused,
      setIsPaused
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 