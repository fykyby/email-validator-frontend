<script lang="ts">
	import type { List } from '$lib/types';
	import { readable } from 'svelte/store';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, ArrowLeft, ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import AddListDialog from '$lib/components/AddListDialog.svelte';
	import ListsTableActions from './ListsTableActions.svelte';
	import ListsTableCheckbox from './ListsTableCheckbox.svelte';

	type Props = {
		data: {
			lists: List[];
		};
	};

	const { data }: Props = $props();

	const table = createTable(readable(data.lists), {
		page: addPagination({
			serverSide: true,
			initialPageSize: 10,
			serverItemCount: readable(3)
		}),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			serverSide: true,
			initialSortKeys: [{ id: 'upload_date', order: 'desc' }]
		}),
		filter: addTableFilter({
			serverSide: true
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
				},
				filter: {
					exclude: true
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

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { sortKeys } = pluginStates.sort;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;

	$effect(() => {
		// TODO: url based pagination
		console.log('page', $pageIndex);

		// TODO: url based sorting
		console.log('sort', $sortKeys);

		// TODO: url based filtering
		console.log('filter', $filterValue);
	});
	$effect(() => {
		console.log($selectedDataIds);
	});
</script>

<div>
	<div class="flex items-center gap-4 pb-4">
		<div class="flex grow gap-4">
			<AddListDialog />
			<Input class="max-w-sm" placeholder="Search..." type="search" bind:value={$filterValue} />
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
										{:else}
											<div class="-ml-4">
												<Button variant="ghost" onclick={props.sort.toggle}>
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
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			<ArrowLeft />
		</Button>
		<Button
			variant="outline"
			size="icon"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
		>
			<ArrowRight />
		</Button>
	</div>
</div>
