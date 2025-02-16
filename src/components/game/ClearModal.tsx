'use client';

import { COLORS } from '@/styles/colors';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ClearModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  time: string;
  maxNumber: number;
}

export default function ClearModal({ isOpen, onConfirm, onCancel, time, maxNumber }: ClearModalProps) {
  const { messages } = useLanguage();
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-sm ${COLORS.MODAL.BACKDROP} flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
    >
      <div className={`p-6 rounded-lg border shadow-xl ${COLORS.MODAL.BG} ${COLORS.MODAL.BORDER}`}>
        <div className="mb-6 text-center">
          <div className="mb-4">
            <p className={`text-sm font-medium ${COLORS.MODAL.TEXT}`}>{messages.modal.yourTime}</p>
            <p className={`text-2xl font-bold ${COLORS.MODAL.HIGHLIGHT}`}>{time}</p>
          </div>
          <div className="mb-6">
            <p className={`text-sm font-medium ${COLORS.MODAL.TEXT}`}>{messages.modal.yourLastNumber}</p>
            <p className={`text-2xl font-bold ${COLORS.MODAL.HIGHLIGHT}`}>{maxNumber}</p>
          </div>
          <p className={`${COLORS.MODAL.TEXT}`}>
            {messages.modal.clearConfirm}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT} ${COLORS.BUTTON.PRIMARY.HOVER}`}
          >
            {messages.buttons.confirm}
          </button>
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER}`}
          >
            {messages.buttons.cancel}
          </button>
        </div>
      </div>
    </div>
  );
} 