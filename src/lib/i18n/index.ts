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
    readonly close: string;
    readonly howToPlay: string;
    readonly share: string;
    readonly topList: string;
  };
  readonly modal: {
    readonly multipleStepsUndo: string;
    readonly clearConfirm: string;
    readonly yourTime: string;
    readonly yourLastNumber: string;
    readonly howToPlay: {
      readonly title: string;
      readonly objective: string;
      readonly objectiveText: string;
      readonly rules: string;
      readonly rulesList: readonly string[];
    };
    readonly share: {
      readonly title: string;
      readonly username: string;
      readonly usernameError: string;
      readonly shareButton: string;
      readonly success: string;
      readonly error: string;
    };
    readonly topList: {
      readonly title: string;
      readonly username: string;
      readonly lastNumber: string;
      readonly time: string;
      readonly loading: string;
      readonly error: string;
    };
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