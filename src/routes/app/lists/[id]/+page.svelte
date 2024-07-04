<script lang="ts">
	import AlertError from '$lib/components/AlertError.svelte';
	import Header from '$lib/components/Header.svelte';
	import LoadingCircle from '$lib/components/LoadingCircle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	import ListTable from './ListTable.svelte';

	let { data } = $props();
</script>

<Header>
	<Button variant="ghost" size="icon" href="/app/lists">
		<ArrowLeft />
	</Button>
	<h1>List</h1>
</Header>

{#await data.responseData}
	<LoadingCircle center size="xl" />
{:then responseData}
	{#if responseData.status === 'error'}
		<AlertError message={responseData.message} />
	{/if}

	{#if responseData.data?.emails}
		<ListTable data={responseData.data} />
	{/if}
{/await}
