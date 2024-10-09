export enum Locale {
  eng = 'eng',
  ukr = 'ukr',
  rus = 'rus',
}

export enum RegionLocale {
  'en-US' = Locale.eng,
  'uk-UA' = Locale.ukr,
  'ru-RU' = Locale.rus,
}

export type Locales = {
  [key in Locale]?: Record<string, string>;
};

export type I18n = {
  locale: Locale;
  locales: Locales;
};
