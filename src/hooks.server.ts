import type { User } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const userCookie = event.cookies.get('user_info');

	try {
		const user: User = JSON.parse(userCookie!);
		event.locals.user = user;
	} catch {
		event.locals.user = null;

		if (event.route.id?.startsWith('/app')) {
			redirect(307, '/authenticate');
		}
	}

	const response = await resolve(event);
	return response;
}
