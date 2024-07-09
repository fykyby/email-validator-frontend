<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { apiRequest, newResponseData } from '$lib/api';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import AlertError from './AlertError.svelte';
	import AlertSuccess from './AlertSuccess.svelte';
	import LoadingCircle from './LoadingCircle.svelte';
	import { Button } from './ui/button';
	import Input from './ui/input/input.svelte';
	import Label from './ui/label/label.svelte';
	import { Plus } from 'lucide-svelte';

	let responseData = $state(newResponseData());
	let open = $state(false);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		responseData.status = 'pending';

		const formData = new FormData(e.target as HTMLFormElement);

		const response = await apiRequest({
			path: '/lists',
			method: 'POST',
			body: formData,
			bodyType: 'formdata'
		});

		responseData = response;

		if (response.status === 'success') {
			await invalidateAll();
			open = false;
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger asChild let:builder>
		<Button class="shrink-0" builders={[builder]} variant="outline" size="icon">
			<Plus />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create new list</Dialog.Title>
		</Dialog.Header>

		<form id="createListForm" onsubmit={submit}>
			<Label>
				Name
				<Input name="name" type="text" />
			</Label>

			<Label>
				Files
				<Input
					name="files"
					type="file"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					multiple
				/>
			</Label>
		</form>

		<Dialog.Footer>
			<div class="flex w-full flex-col gap-4 sm:items-end">
				{#if responseData.status === 'error'}
					<AlertError message={responseData.message} />
				{/if}
				{#if responseData.status === 'success'}
					<AlertSuccess message={responseData.message} />
				{/if}

				{#if responseData.status === 'pending'}
					<Button disabled>
						<LoadingCircle />
					</Button>
				{:else}
					<Button type="submit" form="createListForm">Submit</Button>
				{/if}
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
