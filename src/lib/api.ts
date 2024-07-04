import { PUBLIC_API_URL } from '$env/static/public';
import type { ResponseData } from './types';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type FetchConfig = {
	method: Method;
	credentials: 'include';
	headers?: HeadersInit;
	body?: BodyInit;
};

type RequestData = {
	method: Method;
	path: string;
	body?: BodyInit;
	bodyType?: 'json' | 'formdata';
};

export async function apiRequest(request: RequestData): Promise<ResponseData> {
	if (!request.bodyType) {
		request.bodyType = 'json';
	}

	const requestData: FetchConfig = {
		method: request.method,
		credentials: 'include',
		headers: undefined,
		body: undefined
	};

	if (request.body) {
		requestData.body = request.body;

		if (request.bodyType === 'json') {
			requestData.headers = new Headers([['Content-Type', 'application/json']]);
		}
	}

	try {
		const response = await fetch(PUBLIC_API_URL + request.path, requestData);
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
