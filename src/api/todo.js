import { Config, useFetchAuthorized } from "services";

import queryBuilder from "utils/queryBuilder";

import { errorHandler } from "./errorHandler";

export const useTodoApi = () => {
	const fetchAuthorized = useFetchAuthorized();

	const create = (title) =>
		fetchAuthorized(`${Config.apiRoot()}/todo`, {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ title }),
		}).then(errorHandler);

	const update = (id, isCompleted) =>
		fetchAuthorized(`${Config.apiRoot()}/todo/${id}`, {
			headers: {
				"Content-type": "application/json",
			},
			method: "PATCH",
			body: JSON.stringify({ isCompleted }),
		}).then(errorHandler);

	const remove = (id) =>
		fetchAuthorized(`${Config.apiRoot()}/todo/${id}`, {
			headers: {
				"Content-type": "application/json",
			},
			method: "DELETE",
		}).then(errorHandler);

	const find = (obj = {}) => {
		const { isCompleted } = obj;

		return fetchAuthorized(
			`${Config.apiRoot()}/todo?${queryBuilder({
				isCompleted,
			})}`,
			{
				method: "GET",
			}
		).then(errorHandler);
	};

	return {
		create,
		update,
		remove,
		find,
	};
};
