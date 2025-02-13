'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Messages, DEFAULT_LANGUAGE, getMessages } from '@/lib/i18n';

interface LanguageContextType {
  currentLanguage: Language;
  messages: Messages;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [messages, setMessages] = useState<Messages>(getMessages(DEFAULT_LANGUAGE));

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    setMessages(getMessages(lang));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, messages, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 