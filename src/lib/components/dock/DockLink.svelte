<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { Button } from '../ui/button';

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

<Tooltip.Root openDelay={250}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="ghost"
			size="iconxl"
			builders={[builder]}
			href={url}
			class={`hover:bg-muted rounded-lg p-2 ${current ? 'bg-muted' : ''}`}
		>
			<!-- class:bg-muted={current} -->
			<svelte:component this={icon} class="h-full w-full" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>{title}</p>
	</Tooltip.Content>
</Tooltip.Root>
