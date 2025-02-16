'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/styles/colors';
import { useLanguage } from '@/lib/contexts/LanguageContext';

const USERNAME_STORAGE_KEY = 'numbers_game_username';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: string;
  maxNumber: number;
}

export default function ShareModal({ isOpen, onClose, time, maxNumber }: ShareModalProps) {
  const { messages } = useLanguage();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Local storage'dan username'i yükle
  useEffect(() => {
    const savedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    // Kullanıcı adı doğrulama
    if (username.length < 3 || username.length > 20) {
      setError(messages.modal.share.usernameError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          lastNumber: maxNumber,
          time
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      // Başarılı paylaşımda username'i kaydet
      localStorage.setItem(USERNAME_STORAGE_KEY, username);

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch {
      setError(messages.modal.share.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(''); // Kullanıcı yazmaya başladığında hata mesajını temizle
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-sm ${COLORS.MODAL.BACKDROP} flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
    >
      <div className={`p-6 rounded-lg border shadow-xl ${COLORS.MODAL.BG} ${COLORS.MODAL.BORDER}`}>
        <div className="mb-6 text-center">
          <h2 className={`text-2xl font-bold mb-6 ${COLORS.MODAL.HIGHLIGHT}`}>
            {messages.modal.share.title}
          </h2>
          
          <div className="mb-4">
            <p className={`text-sm font-medium ${COLORS.MODAL.TEXT}`}>{messages.modal.yourTime}</p>
            <p className={`text-2xl font-bold ${COLORS.MODAL.HIGHLIGHT}`}>{time}</p>
          </div>
          
          <div className="mb-6">
            <p className={`text-sm font-medium ${COLORS.MODAL.TEXT}`}>{messages.modal.yourLastNumber}</p>
            <p className={`text-2xl font-bold ${COLORS.MODAL.HIGHLIGHT}`}>{maxNumber}</p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder={messages.modal.share.username}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              disabled={isLoading || isSuccess}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {isSuccess ? (
            <p className={`text-lg font-medium ${COLORS.MODAL.HIGHLIGHT}`}>
              {messages.modal.share.success}
            </p>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.PRIMARY.BG} ${COLORS.BUTTON.PRIMARY.TEXT} ${COLORS.BUTTON.PRIMARY.HOVER} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? '...' : messages.modal.share.shareButton}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {messages.buttons.cancel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 