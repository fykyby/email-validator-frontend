<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { apiRequest, newResponseData } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import type { ResponseData } from '$lib/types';
	import AlertError from '../AlertError.svelte';
	import LoadingCircle from '../LoadingCircle.svelte';

	let responseData: ResponseData = $state(newResponseData());

	async function logOut() {
		responseData.status = 'pending';

		const response = await apiRequest('POST', '/logout');
		console.log(response);

		responseData = response;

		if (response.status === 'success') {
			await invalidateAll();
		}
	}
</script>

{#if responseData.status === 'pending'}
	<Button class="disabled w-fit" onclick={logOut}>
		<LoadingCircle />
	</Button>
{:else}
	<Button class="w-fit" onclick={logOut}>Log Out</Button>
{/if}

{#if responseData.status === 'error'}
	<AlertError message={responseData.message} />
{/if}
