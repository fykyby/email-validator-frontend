<script lang="ts">
	import type { EmailAddress, List } from '$lib/types';
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
	import ListTableActions from './ListTableActions.svelte';
	import ListTableCheckbox from './ListTableCheckbox.svelte';

	type Props = {
		data: {
			emails: EmailAddress[];
		};
	};

	const { data }: Props = $props();

	const table = createTable(readable(data.emails), {
		page: addPagination({
			serverSide: true,
			initialPageSize: 10,
			serverItemCount: readable(3)
		}),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			serverSide: true,
			initialSortKeys: [{ id: 'address', order: 'desc' }]
		}),
		filter: addTableFilter({
			serverSide: true
		}),
		select: addSelectedRows()
	});

	const columns = table.createColumns([
		table.column({
			accessor: ({ address }) => address,
			id: 'checkbox',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(ListTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(ListTableCheckbox, {
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
			accessor: ({ address }) => address,
			id: 'address',
			header: 'Address'
		}),
		table.column({
			accessor: ({ address }) => address,
			id: `action`,
			header: '',
			cell: ({ value }) => {
				return createRender(ListTableActions, { addressIDs: [] });
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
			<ListTableActions
				outline
				addressIDs={Object.keys($selectedDataIds).map((key) => {
					// return data.emails[parseInt(key)].id;
					return 0;
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
