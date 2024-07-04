<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import LoadingCircle from '../LoadingCircle.svelte';
	import AlertError from '../AlertError.svelte';
	import type { ResponseData } from '$lib/types';
	import AlertSuccess from '../AlertSuccess.svelte';
	import { apiRequest, newResponseData } from '$lib/api';

	let responseData: ResponseData = $state(newResponseData());

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		responseData.status = 'pending';

		const formData = new FormData(e.target as HTMLFormElement);
		const response = await apiRequest(
			'POST',
			'/register',
			JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password'),
				repeat_password: formData.get('passwordConfirm')
			})
		);
		responseData = response;
	}
</script>

<form onsubmit={submit} class="mx-auto flex w-full flex-col gap-4 rounded border p-4">
	<h2>Register</h2>
	<div>
		<Label for="emailRegister">Email</Label>
		<Input id="emailRegister" name="email" type="email" required />
	</div>
	<div>
		<Label for="passwordRegister">Password</Label>
		<Input id="passwordRegister" name="password" type="password" required />
	</div>
	<div>
		<Label for="passwordConfirmRegister">Confirm Password</Label>
		<Input id="passwordConfirmRegister" name="passwordConfirm" type="password" required />
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
