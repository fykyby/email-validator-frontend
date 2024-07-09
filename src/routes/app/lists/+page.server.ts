import { apiRequest } from '$lib/api.js';
import type { ListsApiResponse } from '$lib/types';

export async function load({ request, url }) {
	const clientCookies = request.headers.get('cookie');

	let path = '/lists';
	const params = new URLSearchParams(url.searchParams.toString());
	if (params.size > 0) {
		path = path + '?' + params.toString();
	}

	return {
		responseData: apiRequest({
			method: 'GET',
			path: path,
			cookies: clientCookies
		}) as Promise<ListsApiResponse>
	};
}
