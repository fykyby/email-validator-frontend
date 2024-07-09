<script lang="ts">
	import ListsTable from './ListsTable.svelte';
	import LoadingCircle from '$lib/components/LoadingCircle.svelte';
	import AlertError from '$lib/components/AlertError.svelte';
	import Header from '$lib/components/Header.svelte';

	let { data } = $props();
</script>

<Header>
	<h1>Lists</h1>
</Header>

{#await data.responseData}
	<LoadingCircle center size="xl" />
{:then responseData}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.data?.lists}
		<ListsTable data={responseData.data} />
	{/if}
{/await}
