import { browser } from '$app/environment';
import { acceptLanguageMap } from '$lib/configurations/locale-mappings';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'eng';
console.log(11111);
register('eng', () => import('./locales/eng.json'));
register('ukr', () => import('./locales/ukr.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? acceptLanguageMap.get(window.navigator.language) ?? defaultLocale : defaultLocale,
});
