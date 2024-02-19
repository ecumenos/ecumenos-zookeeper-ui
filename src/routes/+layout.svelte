<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/assets/app.css';
</script>

<svelte:head>
	<title>{$page.data?.stuff?.title ? `${$page.data?.stuff?.title} | ` : ''}Ecumenos</title>
</svelte:head>

<slot />
