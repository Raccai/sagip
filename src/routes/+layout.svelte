<script>
	import '../app.css';
	import Topbar from '$lib/components/Topbar.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	onMount(() => {
		goto('/contacts');
	})
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

