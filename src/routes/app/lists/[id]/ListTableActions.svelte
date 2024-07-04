<script lang="ts">
	import { Ellipsis } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		addressIDs: number[];
		outline?: boolean;
	};

	const { addressIDs, outline }: Props = $props();

	function deleteAddress() {
		console.log('delete', addressIDs);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			class="shrink-0"
			variant={outline ? 'outline' : 'ghost'}
			builders={[builder]}
			size="icon"
		>
			<Ellipsis />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={deleteAddress}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
