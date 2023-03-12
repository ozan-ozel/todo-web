import React, { useState } from "react";
import { useSelector } from "react-redux";

import { AuthContext, FetchError } from "./AuthContext";

export default function AuthProvider({ children }) {
	const [user, setUser] = useState();
	const { jwt: selectedJWT } = useSelector((state) => state.jwt);

	const fetchAuthorized = async (url, opt = {}) => {
		if (!selectedJWT) {
			throw new FetchError("Not authenticated");
		}

		opt.headers = {
			"Content-type": "application/json",
			Authorization: `Bearer ${selectedJWT}`,
			...opt.headers,
		};

		return fetch(url, opt);
	};

	return (
		<AuthContext.Provider
			value={{
				fetchAuthorized,
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
