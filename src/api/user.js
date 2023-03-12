import { Config, useFetchAuthorized } from "services";

import { errorHandler } from "./errorHandler";

export const useUserApi = () => {
	const login = ({ email, password }) =>
		fetch(`${Config.apiRoot()}/users/login`, {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ email, password }),
		}).then(errorHandler);

	const register = (body) =>
		fetch(`${Config.apiRoot()}/users`, {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(body),
		}).then(errorHandler);

	return {
		login,
		register
	};
};
