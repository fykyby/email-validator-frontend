<script lang="ts">
	import { page } from '$app/stores';
	import Dock from '$lib/components/dock/Dock.svelte';
	import '../app.css';
</script>

<main class="mx-auto flex max-w-5xl flex-col gap-4 p-4">
	<slot />
</main>
{#if $page.route.id?.startsWith('/app')}
	<Dock />
{/if}
