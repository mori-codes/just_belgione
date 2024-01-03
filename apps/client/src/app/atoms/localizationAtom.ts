import { atomWithStorage } from 'jotai/utils';
import { spanish } from '../translations/spanish';
import { english } from '../translations/english';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { AvailableLanguages } from '@just-belgione/types';

const translateNavigatorLanguage = (language: string): AvailableLanguages => {
  if (language.startsWith('es')) {
    return 'spanish';
  }

  return 'english';
};

const translationTable: Record<AvailableLanguages, typeof spanish> = {
  spanish,
  english,
};

const localizationAtom = atomWithStorage<AvailableLanguages>(
  'language',
  translateNavigatorLanguage(navigator.language)
);
console.log(navigator.languages);

const useLocalization = () => {
  const [locale, setLocale] = useAtom(localizationAtom);

  const localization = useMemo(
    () => ({
      locale,
      setLocale,
      stringTable: translationTable[locale],
    }),
    [locale, setLocale]
  );

  return localization;
};

export { useLocalization };
