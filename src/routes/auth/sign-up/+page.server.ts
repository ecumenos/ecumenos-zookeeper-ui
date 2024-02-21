import { isLeft } from '$lib/pkgs/either';
import { ComptusCountry, ComptusLanguage } from '$lib/pkgs/zookeeper-client';
import { signUp } from '$lib/server/zookeeper-api';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  if (cookies.get('token') ?? '' !== '') throw redirect(307, '/dashboard');
};

export const actions: Actions = {
	register: async ({ cookies, request, locals}) => {
    let email: string;
    let password: string;
    let country: ComptusCountry;
    let langauge: ComptusLanguage;

    try {
      const data = await request.formData();
      email = validateEmail(data.get('email'));
      password = validatePassword(data.get('password'));
      country = validateCountry(data.get('country'));
      langauge = validateLanguage(data.get('langauge'));
    } catch (err: unknown) {
      return fail(400, { message: err });
    }

		try {
      const result = await signUp(email, password, country, langauge);
    if (isLeft(result)) {
      return fail(400, { message: result.value });
    }
    const { self, session_id: sessionId, tokens } = result.value;

    cookies.set('token', `Bearer ${tokens.token}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
    locals.user = {
      isAuthenticated: true,
      id: self.id,
      email: self.email,
      country: self.country,
      language: self.language,
    };
    locals.session.id = sessionId;
    } catch (err: unknown) {
      return fail(500, { message: err });
    }

		throw redirect(307, '/dashboard');
	},
};

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

function validateCountry(v: FormDataEntryValue | null): ComptusCountry {
  if (v == null) {
    throw new Error('country could not be empty');
  }

  for (const key in ComptusCountry) {
    if (ComptusCountry[key as keyof typeof ComptusCountry] === v.toString()) {
        return ComptusCountry[key as keyof typeof ComptusCountry] as ComptusCountry;
    }
  }
  throw new Error(`invalid country value (country: ${v})`);
}

function validateLanguage(v: FormDataEntryValue | null): ComptusLanguage {
  if (v == null) {
    throw new Error('language could not be empty');
  }

  for (const key in ComptusLanguage) {
    if (ComptusLanguage[key as keyof typeof ComptusLanguage] === v.toString()) {
        return ComptusLanguage[key as keyof typeof ComptusLanguage] as ComptusLanguage;
    }
  }
  throw new Error(`invalid language value (language: ${v})`);
}
