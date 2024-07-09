<script lang="ts">
	import { Ellipsis } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import type { ApiResponse } from '$lib/types';
	import { apiRequest, newResponseData } from '$lib/api';
	import { invalidateAll } from '$app/navigation';

	type Props = {
		listIDs: number[];
		outline?: boolean;
	};

	const { listIDs, outline }: Props = $props();

	let responseData: ApiResponse = $state(newResponseData());

	async function deleteList() {
		responseData.status = 'pending';

		const response = await apiRequest({
			method: 'DELETE',
			path: '/lists',
			body: JSON.stringify({
				list_ids: listIDs
			})
		});

		responseData = response;

		if (responseData.status === 'success') {
			await invalidateAll();
		}
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
		<DropdownMenu.Item onclick={deleteList}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
