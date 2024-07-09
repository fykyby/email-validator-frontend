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

export type ListData = {
	lists: List[];
	limit: number;
	page: number;
	total: number;
};

export type ListDataTest = {
	lists: List[];
	page: {
		number: number;
		size: number;
		total: number;
	};
	sort: {
		id: string;
		order: 'asc' | 'desc';
	};
	query: string;
};

export interface ListsApiResponse extends ApiResponse {
	data: ListData;
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
