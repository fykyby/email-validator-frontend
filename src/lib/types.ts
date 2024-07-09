export type User = {
	id: number;
	email: string;
};

export type ApiResponse = {
	status: 'success' | 'error' | 'pending' | 'unset';
	message: string | null;
	data: object | null;
};

export type List = {
	id: number;
	name: string;
	upload_date: string;
	status: 'NOT VALIDATED' | 'VALIDATED' | 'PENDING';
};

export interface ListsApiResponse extends ApiResponse {
	data: {
		lists: List[];
		limit: number;
		page: number;
		total: number;
	};
}

export type EmailAddress = {
	address: string;
	status: unknown;
};

export interface ListApiResponse extends ApiResponse {
	data: {
		emails: EmailAddress[];
	};
}
