<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { apiRequest, newResponseData } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import type { ResponseData } from '$lib/types';
	import AlertError from '../AlertError.svelte';
	import LoadingCircle from '../LoadingCircle.svelte';
	import { LogOut } from 'lucide-svelte';

	let responseData: ResponseData = $state(newResponseData());

	async function logOut() {
		responseData.status = 'pending';

		const response = await apiRequest('POST', '/logout');

		responseData = response;

		if (response.status === 'success') {
			await invalidateAll();
		}
	}
</script>

<div class="flex flex-col items-end gap-4">
	{#if responseData.status === 'pending'}
		<Button disabled size="icon" variant="ghost" class="disabled" onclick={logOut}>
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
