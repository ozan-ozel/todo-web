import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";

import { setJwt } from "actions/JwtActions";

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<Typography
			sx={{ fontSize: "14px", position: "absolute", top: "16px", right: "16px", cursor: "pointer" }}
			onClick={() => {
				dispatch(setJwt());
				navigate("/login");
			}}
		>
			Logout
		</Typography>
	);
}
