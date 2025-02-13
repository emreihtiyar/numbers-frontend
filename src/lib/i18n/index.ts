import { en } from './en';
import { tr } from './tr';

export const LANGUAGES = {
  en,
  tr,
} as const;

export type Language = keyof typeof LANGUAGES;
export type Messages = {
  readonly buttons: {
    readonly clear: string;
    readonly confirm: string;
    readonly cancel: string;
  };
  readonly modal: {
    readonly multipleStepsUndo: string;
    readonly clearConfirm: string;
    readonly yourTime: string;
    readonly yourLastNumber: string;
  };
  readonly stats: {
    readonly time: string;
    readonly lastNumber: string;
  };
};

export const DEFAULT_LANGUAGE: Language = 'en';

export function getMessages(lang: Language): Messages {
  return LANGUAGES[lang];
} 