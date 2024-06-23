import { writable } from 'svelte/store';
import i18n, { type Config } from 'sveltekit-i18n';
import { LOCALE } from '$lib/types';

interface Params {
  dateValue: number;
  value: number;
  download: number;
  award: number;
  val: Date;
}

const config: Config<Partial<Params>> = {
  initLocale: 'en',
  loaders: [
    {
      locale: 'en',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/en.json')).default,
    },
    {
      locale: 'hi',
      key: '',
      loader: async () => (await import('$lib/translations/strings/hi.json')).default,
    },
    {
      locale: 'fr',
      key: '',
      loader: async () => (await import('$lib/translations/strings/fr.json')).default,
    },
    {
      locale: 'de',
      key: '',
      loader: async () => (await import('$lib/translations/strings/de.json')).default,
    },
    {
      locale: 'ru',
      key: '',
      loader: async () => (await import('$lib/translations/strings/ru.json')).default,
    },
    {
      locale: 'es',
      key: '',
      loader: async () => (await import('$lib/translations/strings/es.json')).default,
    },
  ],
};

export const {
  t,
  loading,
  locales,
  locale,
  initialized,
  translations,
  loadTranslations,
} = new i18n(config);

export const selectedLocale = writable<string>('en');

// Fallback mechanism for missing translations
t.subscribe((translate) => {
  return (key: string, params: any) => {
    const translation = translate(key, params);
    if (translation === key) {
      console.warn(`[i18n]: Missing translation for key '${key}'`);
      // Provide a fallback translation or the key itself
      return key;
    }
    return translation;
  };
});

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...');
    await loading.toPromise();
  }
});

export async function handleLocaleChange(newLocale: string) {
  if (!newLocale) {
    return;
  }

  locale.set(newLocale);

  await fetch('/api/i18n', {
    body: JSON.stringify({ locale: newLocale }),
    method: 'POST',
  });
}

export function lessonFallbackNote(
  note: string,
  translation: Record<LOCALE, string>,
  locale: LOCALE
) {
  if (!translation) {
    return note;
  }

  const content = translation[locale];

  // if locale is english and no translated content for english but note exists
  if (locale === LOCALE.EN && !content && note?.length) {
    return note;
  }

  return content;
}
