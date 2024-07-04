import { apiRequest } from '$lib/api.js';
import type { ListsApiResponse } from '$lib/types';

export async function load({ request }) {
	const clientCookies = request.headers.get('cookie');

	return {
		responseData: apiRequest({
			method: 'GET',
			path: '/lists',
			cookies: clientCookies
		}) as Promise<ListsApiResponse>
	};
}
