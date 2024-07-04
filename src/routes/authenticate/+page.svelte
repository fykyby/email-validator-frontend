<script lang="ts">
	import LogInForm from '$lib/components/auth/LogInForm.svelte';
	import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	type Props = {
		data: {
			currentTab: 'login' | 'register';
		};
	};

	let { data }: Props = $props();

	async function tabChanged() {
		if (!browser) return;

		await tick();
		const searchParams = new URLSearchParams();
		searchParams.set('tab', data.currentTab);
		goto(`?${searchParams.toString()}`);
	}
</script>

<h1 class="text-center">dutkovsky email validator</h1>

<Tabs.Root bind:value={data.currentTab} onValueChange={tabChanged} class="mx-auto w-full max-w-lg">
	<Tabs.List class="w-full">
		<Tabs.Trigger class="w-full" value="register">Register</Tabs.Trigger>
		<Tabs.Trigger class="w-full" value="login">Log In</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="register">
		<RegisterForm />
	</Tabs.Content>
	<Tabs.Content value="login">
		<LogInForm />
	</Tabs.Content>
</Tabs.Root>
