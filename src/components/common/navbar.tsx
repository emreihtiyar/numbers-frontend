'use client';

import Logo from '@/components/common/Logo';
import Stats from '@/components/game/Stats';
import ClearModal from '@/components/game/ClearModal';
import HowToPlayModal from '@/components/game/HowToPlayModal';
import ShareModal from '@/components/game/ShareModal';
import TopListModal from '@/components/game/TopListModal';
import { useGame } from '@/lib/contexts/GameContext';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { COLORS } from '@/styles/colors';
import { LANGUAGES } from '@/lib/i18n';
import { useState } from 'react';
import { HelpCircle, Share2, Trophy, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { maxNumber, handleClear, setIsPaused } = useGame();
  const { messages, currentLanguage, setLanguage } = useLanguage();
  const [showClearModal, setShowClearModal] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTopListModal, setShowTopListModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav className="w-full h-16 border-b border-gray-200">
      <div className="container mx-auto h-full px-4 flex items-center">
        {/* Sol Grup: Logo ve Oyun Kontrolleri */}
        <div className="flex-1 flex items-center gap-4">
          <Logo />
          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowHowToPlayModal(true)}
              className={`p-2 rounded-full transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER}`}
              title={messages.buttons.howToPlay}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className={`p-2 rounded-full transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER}`}
              title={messages.buttons.share}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowTopListModal(true)}
              className={`p-2 rounded-full transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER}`}
              title={messages.buttons.topList}
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orta Grup: Stats ve Clear (Sadece masaüstünde) */}
        <div className="hidden md:flex items-center gap-4 mx-4 min-w-[200px] justify-center">
          <Stats maxNumber={maxNumber} onTimeUpdate={setCurrentTime} />
          <button 
            onClick={handleClearClick}
            className={`px-4 py-1.5 rounded-md transition-colors ${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT} ${COLORS.BUTTON.PRIMARY.HOVER}`}
          >
            {messages.buttons.clear}
          </button>
        </div>

        {/* Sağ Grup: Dil Seçimi ve Mobil Menü */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-4">
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
          {/* Mobil Stats */}
          <div className="md:hidden flex items-center">
            <Stats maxNumber={maxNumber} onTimeUpdate={setCurrentTime} />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full transition-colors hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 pt-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                setShowHowToPlayModal(true);
                closeMobileMenu();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <HelpCircle className="w-5 h-5" />
              <span>{messages.buttons.howToPlay}</span>
            </button>
            <button
              onClick={() => {
                setShowShareModal(true);
                closeMobileMenu();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Share2 className="w-5 h-5" />
              <span>{messages.buttons.share}</span>
            </button>
            <button
              onClick={() => {
                setShowTopListModal(true);
                closeMobileMenu();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Trophy className="w-5 h-5" />
              <span>{messages.buttons.topList}</span>
            </button>
            <button
              onClick={() => {
                handleClearClick();
                closeMobileMenu();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>{messages.buttons.clear}</span>
            </button>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <div className="flex flex-col gap-2">
              {Object.keys(LANGUAGES).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as keyof typeof LANGUAGES);
                    closeMobileMenu();
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${
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
        </div>
      )}

      <ClearModal 
        isOpen={showClearModal}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
        time={currentTime}
        maxNumber={maxNumber}
      />
      <HowToPlayModal
        isOpen={showHowToPlayModal}
        onClose={() => setShowHowToPlayModal(false)}
      />
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        time={currentTime}
        maxNumber={maxNumber}
      />
      <TopListModal
        isOpen={showTopListModal}
        onClose={() => setShowTopListModal(false)}
      />
    </nav>
  );
}
