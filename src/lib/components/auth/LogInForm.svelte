<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import LoadingCircle from '../LoadingCircle.svelte';
	import AlertError from '../AlertError.svelte';
	import type { ResponseData } from '$lib/types';
	import AlertSuccess from '../AlertSuccess.svelte';
	import { apiRequest, newResponseData } from '$lib/api';
	import { invalidateAll } from '$app/navigation';

	let responseData: ResponseData = $state(newResponseData());

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		responseData.status = 'pending';

		const formData = new FormData(e.target as HTMLFormElement);
		const response = await apiRequest(
			'POST',
			'/login',
			JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		);
		responseData = response;

		if (responseData.status === 'success') {
			await invalidateAll();
		}
	}
</script>

<form onsubmit={submit} class="mx-auto flex w-full flex-col gap-4 rounded border p-4">
	<h2>Log In</h2>
	<div>
		<Label for="emailLogIn">Email</Label>
		<Input id="emailLogIn" name="email" type="email" required />
	</div>
	<div>
		<Label for="passwordLogIn">Password</Label>
		<Input id="passwordLogIn" name="password" type="password" required />
	</div>

	{#if responseData.status === 'success'}
		<AlertSuccess message={responseData.message} />
	{/if}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.status === 'pending'}
		<Button disabled type="submit">
			<LoadingCircle />
		</Button>
	{:else}
		<Button type="submit">Submit</Button>
	{/if}
</form>
