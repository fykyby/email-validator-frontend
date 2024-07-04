<script lang="ts">
	import AddListDialog from '$lib/components/AddListDialog.svelte';
	import ListTable from './ListTable.svelte';
	import LoadingCircle from '$lib/components/LoadingCircle.svelte';
	import AlertError from '$lib/components/AlertError.svelte';

	let { data } = $props();
</script>

<h1>Lists</h1>

<AddListDialog />

{#await data.responseData}
	<LoadingCircle center size="xl" />
{:then responseData}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.data?.files}
		<!-- <ListTable /> -->
		{#each responseData.data.files as list}
			<div>
				{list.filename}
			</div>
		{/each}
	{/if}
{/await}
