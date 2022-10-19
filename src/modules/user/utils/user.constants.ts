export const userExampleValues = {
	id: "6245f85c6952f1cde2558455",
	email: "test@test.com",
	username: "user_name",
	password: "c2cb2@f78#ba718",
	encryptedPassword:
    "$2b$10$44HLL8d7z39Qho2iLPI9TOuVl/I4xveJsHI3/OrTpR6YL/zwbkz4G",

	createdAt: "2021-01-01T03:00:00.000Z",
	updatedAt: "2021-01-01T03:00:00.000Z",
};

export const userPaginatedExampleValues = {
	items: [
		{
			id: "6245f85c6952f1cde2558455",
			roles: "admin",
			externalId: "27ry9634t",
			email: "test@test.com",
			name: "user_name",
			inactive: false,
			createdAt: "2021-01-01T03:00:00.000Z",
			updatedAt: "2021-01-01T03:00:00.000Z",
		},
	],
	meta: {
		totalItems: 3,
		itemCount: 3,
		itemsPerPage: 10,
		totalPages: 1,
		currentPage: 1,
	},
};
