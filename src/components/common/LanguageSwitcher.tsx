'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';
import { LANGUAGES } from '@/lib/i18n';
import { COLORS } from '@/styles/colors';

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 flex gap-2">
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
  );
} 