<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	type Props = {
		message: string | null;
	};

	let { message }: Props = $props();

	if (message === null) {
		message = 'An unknown error has occurred.';
	}
</script>

<Alert.Root variant="destructive">
	<CircleAlert class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>{message}</Alert.Description>
</Alert.Root>
