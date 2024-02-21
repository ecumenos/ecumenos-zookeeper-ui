export enum Locale {
  eng = 'eng',
  ukr = 'ukr',
}

export const defaultLocale = Locale.eng;

export const acceptLanguageMap = new Map([
  [Locale.eng, Locale.eng],
  ['en', Locale.eng],
  ['en-US', Locale.eng],
  ['en-us', Locale.eng],
  ['en-GR', Locale.eng],
  ['en-gr', Locale.eng],
  ['en-GB', Locale.eng],
  ['en-gb', Locale.eng],
  ['en-au', Locale.eng],
  ['en-AU', Locale.eng],
  ['en-ca', Locale.eng],
  ['en-CA', Locale.eng],
  ['en-nz', Locale.eng],
  ['en-NZ', Locale.eng],
  ['en-ie', Locale.eng],
  ['en-IE', Locale.eng],
  ['en-za', Locale.eng],
  ['en-ZA', Locale.eng],
  ['en-jm', Locale.eng],
  ['en-JM', Locale.eng],
  ['en-bz', Locale.eng],
  ['en-BZ', Locale.eng],
  ['en-tt', Locale.eng],
  ['en-TT', Locale.eng],
  [Locale.ukr, Locale.ukr],
  ['uk', Locale.ukr],
  ['uk-UA', Locale.ukr],
]);
