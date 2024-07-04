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
	filename: string;
	upload_date: string;
};

export interface ListsApiResponse extends ApiResponse {
	data: {
		files: List[];
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
