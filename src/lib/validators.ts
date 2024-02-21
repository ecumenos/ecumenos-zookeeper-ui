import { Country } from "./configurations/countries";
import { Locale } from "./configurations/locale-mappings";

function validateEmail(v: FormDataEntryValue | null): string {
  if (v == null) {
    throw new Error('email could not be empty');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(v.toString())) {
    throw new Error(`email doesn't match email pattern (email: ${v})`);
  }

  return v.toString();
}

function validatePassword(v: FormDataEntryValue | null): string {
  if (v == null) {
    throw new Error('password could not be empty');
  }

  return v.toString();
}

function validateCountry(v: FormDataEntryValue | null): Country {
  if (v == null) {
    throw new Error('country could not be empty');
  }

  for (const key in Country) {
    if (Country[key as keyof typeof Country] === v.toString()) {
        return Country[key as keyof typeof Country] as Country;
    }
  }
  throw new Error(`invalid country value (country: ${v})`);
}

function validateLanguage(v: FormDataEntryValue | null): Locale {
  if (v == null) {
    throw new Error('language could not be empty');
  }

  for (const key in Locale) {
    if (Locale[key as keyof typeof Locale] === v.toString()) {
        return Locale[key as keyof typeof Locale] as Locale;
    }
  }
  throw new Error(`invalid language value (language: ${v})`);
}
