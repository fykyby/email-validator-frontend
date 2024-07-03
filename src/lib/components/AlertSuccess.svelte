<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	type Props = {
		message: string | null;
	};

	let { message }: Props = $props();

	if (message === null) {
		message = 'Action performed successfully.';
	}
</script>

<Alert.Root variant="success">
	<CircleAlert class="h-4 w-4" />
	<Alert.Title>Success</Alert.Title>
	<Alert.Description>{message}</Alert.Description>
</Alert.Root>
