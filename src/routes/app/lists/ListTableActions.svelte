<script lang="ts">
	import { Ellipsis } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		listIDs: number[];
		outline?: boolean;
	};

	const { listIDs, outline }: Props = $props();

	function deleteList() {
		console.log('delete', listIDs);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant={outline ? 'outline' : 'ghost'} builders={[builder]} size="icon">
			<Ellipsis />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={deleteList}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
