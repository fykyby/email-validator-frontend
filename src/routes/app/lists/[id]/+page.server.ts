import { apiRequest } from '$lib/api.js';
import type { ListApiResponse } from '$lib/types.js';

export async function load({ request, params }) {
	const clientCookies = request.headers.get('cookie');

	return {
		responseData: apiRequest({
			method: 'GET',
			path: '/lists/' + params.id,
			cookies: clientCookies
		}) as Promise<ListApiResponse>
	};
}
