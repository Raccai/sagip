<script>
	import '../app.css';
	import Topbar from '$lib/components/Topbar.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
</script>

<main>
	<Topbar />

	{#if children}
		{@render children()}
	{:else}
		<p>No content available</p>
	{/if}

	<Navbar />
</main>

