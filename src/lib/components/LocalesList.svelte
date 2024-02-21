<script lang="ts">
  import { _, locale } from 'svelte-i18n';
	import { Locale } from '$lib/configurations/locale-mappings';
	import LocalesListElement from '$lib/components/LocalesListElement.svelte';

  $:  localesExceptPicked = Object.values(Locale).filter((l) => l !== $locale);
  const pickLocaleFactory = (l: string) => () => locale.set(l);

</script>

<div >
  <button>
    <span>{$_(`common.locales.${$locale}`)}</span>
  </button>
  <menu>
    <ul>
      {#each localesExceptPicked as l}
        <LocalesListElement><a href="#?" on:click={pickLocaleFactory(l)}>{$_(`common.locales.${l}`)}</a></LocalesListElement>
      {/each}
    </ul>
  </menu>
</div>

<style>
  *,
	*::before,
	*::after {
  	box-sizing: border-box;
	}

	ul {
  	margin: 0;
		padding: 0;
	}

	ul {
		list-style-type: none;
	}

	a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

	div {
		transition: all 0.5s ease;
	}

  button {
    border: none;
    background-color: inherit;
  }

  menu {
    display: none;
    position: absolute;
    margin-block-start: 0;
    padding: 0;
    border: 1px solid black;
    background-color: white;
    visibility: hidden;
    opacity: 0;
		/* right: 1%; */
    overflow: hidden;
  }

  div:hover,
  div:focus,
  div:hover > menu,
  div:focus > menu {
    display: block;
    visibility: visible;
    opacity: 1;
  }
</style>
