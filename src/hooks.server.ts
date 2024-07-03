import type { User } from '$lib/types';

export async function handle({ event, resolve }) {
	const userCookie = event.cookies.get('user_info');

	try {
		const user: User = JSON.parse(userCookie!);
		event.locals.user = user;
	} catch {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
}
