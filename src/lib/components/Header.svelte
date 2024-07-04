<script lang="ts">
	type Props = {
		children?: any;
	};

	const { children }: Props = $props();
</script>

<header class="-mt-4 flex items-center gap-4 border-b py-4 shadow-md">
	{@render children()}
</header>
