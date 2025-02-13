'use client';

import { COLORS } from '@/styles/colors';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, onConfirm, onCancel }: ConfirmModalProps) {
  const { messages } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 backdrop-blur-sm ${COLORS.MODAL.BACKDROP} flex items-center justify-center`}>
      <div className={`p-6 rounded-lg border shadow-xl ${COLORS.MODAL.BG} ${COLORS.MODAL.BORDER}`}>
        <p className={`mb-6 text-center ${COLORS.MODAL.TEXT}`}>
          {messages.modal.multipleStepsUndo}
        </p>
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