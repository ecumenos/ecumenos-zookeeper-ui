<script lang="ts">
	import LocalesList from './../../lib/components/LocalesList.svelte';
  import { _ } from 'svelte-i18n';
</script>

<header>
  <div class="container">
    <div class="row">
      <div class="logo"></div>
      <div class="header-right-bar">
        <div class="header-section">
          <a href="/auth/sign-in">{$_('common.navigation.sign-in')}</a>
        </div>
        <div class="header-section">
          <a href="/auth/sign-up">{$_('common.navigation.sign-up')}</a>
        </div>
        <div class="header-section">
          <LocalesList />
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  .container {
    width: 100%;
    max-width: 1730px;
    padding-left: 60px;
    padding-right: 60px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  .header-section {
    display: inline-block;
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
</style>

