<script lang="ts">
	import LogInForm from '$lib/components/LogInForm.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';

	import * as Tabs from '$lib/components/ui/tabs';
</script>

<h1 class="text-center">dutkovsky email validator</h1>

<Tabs.Root value="register" class="mx-auto w-full max-w-lg">
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
