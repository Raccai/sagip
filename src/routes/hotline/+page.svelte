<script>
    import { hotlines } from '$lib/data/hotlines.js';
    import HotlineCard from '$lib/components/hotline-components/HotlineCard.svelte';
    import { onMount } from 'svelte';
</script>

<div class="hotline-grid">
    {#each hotlines as hotline}
        <HotlineCard {hotline} />
    {/each}
</div>

<style>
    .hotline-grid {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 80px 16px;
        background-color: #f9f9f9;
        gap: 24px;
    }

    @media (min-width: 768px) {
        .hotline-grid {
            padding-bottom: 140px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            align-items: stretch;
        }
    }
</style>