import { redirect } from '@sveltejs/kit';

export function load({ locals, url }) {
	if (locals.user) {
		redirect(303, '/app');
	}

	const tabParam = url.searchParams.get('tab');
	const isTabParamValid = tabParam && (tabParam === 'login' || tabParam === 'register');

	return {
		currentTab: isTabParamValid ? tabParam : 'register'
	};
}
