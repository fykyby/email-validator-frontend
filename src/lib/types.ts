export type User = {
	id: number;
	email: string;
};

export type ResponseData = {
	status: 'success' | 'error' | 'pending' | 'unset';
	message: string | null;
	data: object | null;
};
