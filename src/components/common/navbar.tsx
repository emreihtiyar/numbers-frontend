'use client';

import Logo from '@/components/common/Logo';
import Stats from '@/components/game/Stats';
import ClearModal from '@/components/game/ClearModal';
import { useGame } from '@/lib/contexts/GameContext';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { COLORS } from '@/styles/colors';
import { LANGUAGES } from '@/lib/i18n';
import { useState } from 'react';

export default function Navbar() {
  const { maxNumber, handleClear, setIsPaused } = useGame();
  const { messages, currentLanguage, setLanguage } = useLanguage();
  const [showClearModal, setShowClearModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');

  const handleClearClick = () => {
    setIsPaused(true);
    setShowClearModal(true);
  };

  const handleConfirmClear = () => {
    handleClear();
    setShowClearModal(false);
  };

  const handleCancelClear = () => {
    setIsPaused(false);
    setShowClearModal(false);
  };
  
  return (
    <nav className="w-full h-16 border-b border-gray-200">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <Stats maxNumber={maxNumber} onTimeUpdate={setCurrentTime} />
          <button 
            onClick={handleClearClick}
            className={`px-4 py-1.5 rounded-md transition-colors ${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT} ${COLORS.BUTTON.PRIMARY.HOVER}`}
          >
            {messages.buttons.clear}
          </button>
        </div>
        <div className="flex items-center gap-4">
          {Object.keys(LANGUAGES).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as keyof typeof LANGUAGES)}
              className={`px-3 py-1 rounded transition-colors ${
                currentLanguage === lang
                  ? `${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT}`
                  : `${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT}`
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <ClearModal 
        isOpen={showClearModal}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
        time={currentTime}
        maxNumber={maxNumber}
      />
    </nav>
  );
}
