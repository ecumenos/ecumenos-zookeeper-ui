import { isLeft } from "$lib/pkgs/either";
import { getMe } from "$lib/server/zookeeper-api";
import { redirect, type Handle } from "@sveltejs/kit";
import { locale } from 'svelte-i18n';
import { acceptLanguageMap, defaultLocale } from "./lib/configurations/locale-mappings";
import { unprotectedRoutes } from "./lib/configurations/unprotected-routes";

const extractLocale = (h: Headers): string => {
  const lang = h.get('Accept-Language')?.split(',')[0] ?? '';
  console.log({lang, map: acceptLanguageMap.get(lang)});
  return acceptLanguageMap.get(lang) ?? defaultLocale;
}

export const handle: Handle = async ({ event, resolve }) => {
  locale.set(extractLocale(event.request.headers));

  if (unprotectedRoutes.includes(event.url.pathname)) {
    return resolve(event);
  }

  const tokenCookie = event.cookies.get('token') ?? '';
  console.log(JSON.parse(JSON.stringify({path: event.url.pathname, tokenCookie})))
  if (tokenCookie === '') {
    throw redirect(303, '/auth/sign-in');
  }

  const token = tokenCookie.split(" ")[1];
  const result = await getMe(token);
  if (isLeft(result)) {
    await event.cookies.delete('token', { path: '/' });
    throw redirect(303, '/auth/sign-in');
  }
  console.log("event.url.pathname3::"+event.url.pathname)
  if (result.value) {
    event.locals.user = {
      isAuthenticated: true,
      id: result.value.id,
      email: result.value.email,
      country: result.value.country,
      language: result.value.language,
    };
  }

  return resolve(event);
};
