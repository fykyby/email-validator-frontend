import { PUBLIC_API_URL } from '$env/static/public';
import type { ApiResponse } from './types';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type FetchConfig = {
	method: Method;
	credentials: 'include';
	headers: Headers;
	body?: BodyInit;
};

type RequestData = {
	method: Method;
	path: string;
	body?: BodyInit;
	bodyType?: 'json' | 'formdata';
	cookies?: string | null;
};

export async function apiRequest(request: RequestData): Promise<ApiResponse> {
	if (!request.bodyType) {
		request.bodyType = 'json';
	}

	const requestData: FetchConfig = {
		method: request.method,
		credentials: 'include',
		headers: new Headers(),
		body: undefined
	};

	if (request.body) {
		requestData.body = request.body;

		if (request.bodyType === 'json') {
			requestData.headers.set('Content-Type', 'application/json');
		}
	}

	if (request.cookies) {
		requestData.headers.set('cookie', request.cookies);
	}

	try {
		const response = await fetch(PUBLIC_API_URL + request.path, requestData);
		const data = await response.json();

		if (!data.success) {
			console.log('request error:\n', data.message);
		}

		return {
			status: data.success ? 'success' : 'error',
			message: data.message ?? null,
			data: data.data ?? null
		};
	} catch (error) {
		console.log('request error:\n', error);

		return {
			status: 'error',
			message: null,
			data: null
		};
	}
}

export function newResponseData(): ApiResponse {
	return {
		status: 'unset',
		message: null,
		data: null
	};
}
