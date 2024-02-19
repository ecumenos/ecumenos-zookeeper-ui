<script lang="ts">
	import { page } from '$app/stores';
</script>

<slevte:head>
	<title>{$page.status}</title>
</slevte:head>

<div>
	{#if $page.status === 404}
		<h2>Not Found!</h2>
	{:else}
		<h2>Something went wrong</h2>
	{/if}
</div>

<style>
	h2 {
		margin: 4em 0;
		text-align: center;
	}

	@media (min-width: 480px) {
		h2 {
			font-size: 4em;
		}
	}
</style>
