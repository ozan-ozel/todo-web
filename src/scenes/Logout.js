import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setJwt } from "actions/JwtActions";

export default function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setJwt());
		navigate("/login");
	}, []);

	return <></>;
}
