<script lang="ts">
	import type { ListData } from '$lib/types';
	import { readable } from 'svelte/store';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy, addSelectedRows } from 'svelte-headless-table/plugins';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, ArrowLeft, ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import AddListDialog from '$lib/components/AddListDialog.svelte';
	import ListsTableActions from './ListsTableActions.svelte';
	import ListsTableCheckbox from './ListsTableCheckbox.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	type Props = {
		data: ListData;
	};

	const { data }: Props = $props();

	const table = createTable(readable(data.lists), {
		page: addPagination({
			serverSide: true,
			initialPageSize: data.limit,
			serverItemCount: readable(data.total),
			initialPageIndex: data.page - 1
		}),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			serverSide: true,
			// TODO: Set initial sort keys to data from response
			initialSortKeys: [{ id: 'upload_date', order: 'desc' }]
		}),
		select: addSelectedRows()
	});

	const columns = table.createColumns([
		table.column({
			accessor: ({ id }) => id,
			id: 'checkbox',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(ListsTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(ListsTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'id',
			header: 'ID',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			id: 'name',
			header: 'Name',
			cell: (c) => {
				return createRender(Button, {
					variant: 'link',
					href: `/app/lists/${c.value}`,
					class: 'text-foreground p-0'
				}).slot(data.lists[parseInt(c.row.id)].name);
			}
		}),
		table.column({
			accessor: 'status',
			id: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'upload_date',
			header: 'Created At',
			cell: ({ value }) => {
				const date = new Date(value);
				const formatted = date.toLocaleString('en-GB');
				return formatted;
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			id: `action`,
			header: '',
			cell: ({ value }) => {
				return createRender(ListsTableActions, { listIDs: [value] });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageCount } = pluginStates.page;
	const { sortKeys } = pluginStates.sort;
	const { selectedDataIds } = pluginStates.select;

	// TODO: Set initial query to data from response
	let query = $state('');
	let searchTimeout = $state(0);
	function handleSearch() {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			setParam('query', query);
		}, 500);
	}

	function changePage(page: number) {
		setParam('page', page.toString());
	}

	function onToggleSort() {
		const sort = $page.url.searchParams.get('sort');
		const value = `${$sortKeys[0].id},${$sortKeys[0].order}`;
		if (value === sort) return;
		setParam('sort', value);
	}

	async function setParam(key: string, value: string) {
		const params = new URLSearchParams($page.url.searchParams.toString());
		params.set(key, value);
		await goto(`?${params.toString()}`);
	}
</script>

<div>
	<div class="flex items-center gap-4 pb-4">
		<div class="flex grow gap-4">
			<AddListDialog />

			<Input
				oninput={handleSearch}
				autofocus
				class="max-w-sm"
				placeholder="Search..."
				type="search"
				bind:value={query}
			/>
		</div>
		{#if Object.keys($selectedDataIds).length > 0}
			<ListsTableActions
				outline
				listIDs={Object.keys($selectedDataIds).map((key) => {
					return data.lists[parseInt(key)].id;
				})}
			/>
		{/if}
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'checkbox'}
											<div class="flex">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'action'}
											<div class="flex w-full justify-end">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'id'}
											<div class="w-min">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'name'}
											<div class="-ml-4">
												<Button
													variant="ghost"
													onclick={(e: Event) => {
														props.sort.toggle(e);
														onToggleSort();
													}}
												>
													<Render of={cell.render()} />
													<ArrowUpDown class="ml-2 h-4 w-4" />
												</Button>
											</div>
										{:else}
											<div class="flex justify-center">
												<Button
													variant="ghost"
													onclick={(e: Event) => {
														props.sort.toggle(e);
														onToggleSort();
													}}
												>
													<Render of={cell.render()} />
													<ArrowUpDown class="ml-2 h-4 w-4" />
												</Button>
											</div>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'checkbox'}
											<div class="flex">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'action'}
											<div class="flex w-full justify-end">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'id'}
											<div class="w-min">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="flex justify-center">
												<Badge variant="outline" class="text-nowrap">
													<Render of={cell.render()} />
												</Badge>
											</div>
										{:else if cell.id === 'upload_date'}
											<div class="flex justify-center text-center">
												<Render of={cell.render()} />
											</div>
										{:else}
											<div>
												<Render of={cell.render()} />
											</div>
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-center gap-x-4 py-4">
		<Button
			variant="outline"
			size="icon"
			on:click={() => changePage(data.page - 1)}
			disabled={!$hasPreviousPage}
		>
			<ArrowLeft />
		</Button>
		<span>
			<span>{data.page}</span>
			<span>/</span>
			<span>{$pageCount}</span>
		</span>
		<Button
			variant="outline"
			size="icon"
			disabled={!$hasNextPage}
			on:click={() => changePage(data.page + 1)}
		>
			<ArrowRight />
		</Button>
	</div>
</div>
