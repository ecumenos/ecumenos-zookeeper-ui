<script lang="ts">
  import { _ } from 'svelte-i18n'
	import './page.css';
	import { Country } from '$lib/configurations/countries';
	import { Locale } from '$lib/configurations/locale-mappings';

  let email: string;
  let password: string;
  let country: Country;
  let language: Locale;
</script>

<svelte:head>
  <title>{$_('auth.sign-up.header-title')}</title>
</svelte:head>

<div class="sign-up-form">
  <div class="sign-up-form-inputs">
    <div class="sign-up-form-inputs-element">
      <label for="email">{$_('auth.sign-up.email-label')}</label>
      <input
        id="email"
        type="email"
        placeholder={$_('auth.sign-up.email-placeholder')}
        autocomplete="email"
        bind:value={email}
        required
      >
    </div>

    <div class="sign-up-form-inputs-element">
      <label for="password">{$_('auth.sign-up.password-label')}</label>
      <input
        id="password"
        type="password"
        placeholder={$_('auth.sign-up.password-placeholder')}
        autocomplete="current-password"
        bind:value={password}
        required
      >
    </div>

    <div class="sign-up-form-inputs-element">
      <label for="country">{$_('auth.sign-up.country-label')}</label>
      <select id="country" bind:value={country} required>
        {#each Object.values(Country) as countryCode}
          <option value={countryCode}>{$_(`common.countries.${countryCode}`)}</option>
        {/each}
      </select>
    </div>

    <div class="sign-up-form-inputs-element">
      <label for="language">{$_('auth.sign-up.language-label')}</label>
      <select id="language" bind:value={language} required>
        {#each Object.values(Locale) as languageCode}
          <option value={languageCode}>{$_(`common.locales.${languageCode}`)}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="sign-up-form-submit">
    <button
      disabled={!email || !password}
      class="sign-up-form-submit-btn"
    >
      {$_('auth.sign-up.sign-up-btn')}
    </button>
  </div>
</div>
