<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { Writable } from 'svelte/store';

	type Props = {
		checked: Writable<boolean>;
	};

	const { checked }: Props = $props();
</script>

<Checkbox bind:checked={$checked} />
