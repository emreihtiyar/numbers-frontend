'use client';

import { COLORS } from '@/styles/colors';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  const { messages } = useLanguage();
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-sm ${COLORS.MODAL.BACKDROP} flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
    >
      <div className={`p-6 rounded-lg border shadow-xl max-w-2xl w-full mx-4 ${COLORS.MODAL.BG} ${COLORS.MODAL.BORDER}`}>
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 text-center ${COLORS.MODAL.HIGHLIGHT}`}>
            {messages.modal.howToPlay.title}
          </h2>
          
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${COLORS.MODAL.TEXT}`}>
              {messages.modal.howToPlay.objective}
            </h3>
            <p className={`${COLORS.MODAL.TEXT}`}>
              {messages.modal.howToPlay.objectiveText}
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${COLORS.MODAL.TEXT}`}>
              {messages.modal.howToPlay.rules}
            </h3>
            <ul className={`list-disc pl-5 space-y-2 ${COLORS.MODAL.TEXT}`}>
              {messages.modal.howToPlay.rulesList.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT} ${COLORS.BUTTON.PRIMARY.HOVER}`}
          >
            {messages.buttons.close}
          </button>
        </div>
      </div>
    </div>
  );
} 