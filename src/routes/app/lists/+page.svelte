<script lang="ts">
	import ListTable from './ListTable.svelte';
	import LoadingCircle from '$lib/components/LoadingCircle.svelte';
	import AlertError from '$lib/components/AlertError.svelte';

	let { data } = $props();
</script>

<header>
	<h1>Lists</h1>
</header>

{#await data.responseData}
	<LoadingCircle center size="xl" />
{:then responseData}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.data?.files}
		<ListTable data={responseData.data} />
	{/if}
{/await}
