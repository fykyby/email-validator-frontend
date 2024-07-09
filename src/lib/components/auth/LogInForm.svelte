<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import LoadingCircle from '../LoadingCircle.svelte';
	import AlertError from '../AlertError.svelte';
	import type { ApiResponse } from '$lib/types';
	import AlertSuccess from '../AlertSuccess.svelte';
	import { apiRequest, newResponseData } from '$lib/api';
	import { invalidateAll } from '$app/navigation';

	let responseData: ApiResponse = $state(newResponseData());

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		responseData.status = 'pending';

		const formData = new FormData(e.target as HTMLFormElement);
		const response = await apiRequest({
			method: 'POST',
			path: '/login',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		});

		responseData = response;

		if (responseData.status === 'success') {
			await invalidateAll();
		}
	}
</script>

<form onsubmit={submit}>
	<h2>Log In</h2>

	<Label>
		Email
		<Input name="email" type="email" required disabled={responseData.status === 'pending'} />
	</Label>
	<Label>
		Password
		<Input name="password" type="password" required disabled={responseData.status === 'pending'} />
	</Label>

	{#if responseData.status === 'success'}
		<AlertSuccess message={responseData.message} />
	{/if}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.status === 'pending'}
		<Button disabled>
			<LoadingCircle />
		</Button>
	{:else}
		<Button type="submit">Submit</Button>
	{/if}
</form>
