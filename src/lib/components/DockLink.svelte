<script lang="ts">
	import { page } from '$app/stores';

	type Props = {
		url: string;
		title: string;
		icon: any;
	};

	let { url, title, icon }: Props = $props();
	let current = $state(false);

	$effect(() => {
		if (!$page.route.id) return;
		current = $page.route.id.split('/')[2] === url.split('/')[2];
	});
</script>

<a href={url} class="hover:bg-muted rounded-lg p-2" class:bg-muted={current}>
	<svelte:component this={icon} class="h-12 w-12" />
</a>
