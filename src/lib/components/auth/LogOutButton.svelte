<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { apiRequest, newResponseData } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import type { ApiResponse } from '$lib/types';
	import AlertError from '../AlertError.svelte';
	import LoadingCircle from '../LoadingCircle.svelte';
	import { LogOut } from 'lucide-svelte';

	let responseData: ApiResponse = $state(newResponseData());

	async function logOut() {
		responseData.status = 'pending';

		const response = await apiRequest({
			method: 'POST',
			path: '/logout'
		});

		responseData = response;

		if (response.status === 'success') {
			await invalidateAll();
		}
	}
</script>

<div class="flex flex-col items-end gap-4">
	{#if responseData.status === 'pending'}
		<Button disabled size="icon" variant="ghost" class="disabled">
			<LoadingCircle />
		</Button>
	{:else}
		<Button size="icon" variant="ghost" onclick={logOut}>
			<LogOut />
		</Button>
	{/if}

	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}
</div>
