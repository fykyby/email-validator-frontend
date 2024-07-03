import { PUBLIC_API_URL } from '$env/static/public';
import type { ResponseData } from './types';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type RequestData = {
	method: Method;
	credentials: 'include';
	headers: HeadersInit | undefined;
	body: string | undefined;
};

export async function apiRequest(
	method: Method,
	url: string,
	body?: string
): Promise<ResponseData> {
	const requestData: RequestData = {
		method: method,
		credentials: 'include',
		headers: undefined,
		body: undefined
	};

	if (body && (method === 'POST' || method === 'PUT')) {
		requestData.headers = new Headers([['Content-Type', 'application/json']]);
		requestData.body = body;
	}

	try {
		const response = await fetch(PUBLIC_API_URL + url, requestData);
		const data = await response.json();

		return {
			status: data.success ? 'success' : 'error',
			message: data.message ?? null,
			data: data.data ?? null
		};
	} catch {
		return {
			status: 'error',
			message: null,
			data: null
		};
	}
}

export function newResponseData(): ResponseData {
	return {
		status: 'unset',
		message: null,
		data: null
	};
}
