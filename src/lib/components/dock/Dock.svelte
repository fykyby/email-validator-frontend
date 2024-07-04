<script>
	import DockLink from './DockLink.svelte';
	import { LayoutDashboard, List, Presentation, Mails, User } from 'lucide-svelte';
</script>

<div class="fixed bottom-1 left-1 right-1 z-50 overflow-x-auto">
	<nav
		class="bg-background/75 mx-auto flex w-fit gap-2 rounded-xl border p-2 shadow-md backdrop-blur-sm"
	>
		<DockLink url="/app/dashboard" title="Dashboard" icon={LayoutDashboard} />
		<DockLink url="/app/lists" title="Lists" icon={List} />
		<DockLink url="/app/email-templates" title="Email Templates" icon={Mails} />
		<DockLink url="/app/campaigns" title="Campaigns" icon={Presentation} />
		<DockLink url="/app/account" title="Account" icon={User} />
	</nav>
</div>
