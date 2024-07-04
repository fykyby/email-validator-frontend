<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';

	type Props = {
		size?: 'button' | 'xl';
		center?: boolean;
	};

	const { size = 'button', center = false }: Props = $props();
</script>

<div class="w-fit" class:mx-auto={center} class:h-12={size === 'xl'} class:m-4={size === 'xl'}>
	<LoaderCircle class="h-full w-full animate-spin" />
</div>
