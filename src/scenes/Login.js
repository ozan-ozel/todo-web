import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";

import Card from "components/Card";
import Layout from "components/Layout";
import PageCenteredProgress from "components/PageCenteredProgress";
import TextButton from "components/TextButton";

import useCatchError from "api/useCatchError";
import { useUserApi } from "api/user";

import { setJwt } from "actions/JwtActions";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const catchError = useCatchError();

	const [processing, setProcessing] = useState();
	const [user, setUser] = useState();

	const { login } = useUserApi();

	const handleLogin = () => {
		setProcessing(true);

		login(user)
			.then((res) => {
				dispatch(setJwt(res.access_token));

				navigate("/todo"); // redirect to todo page
			})
			.catch(catchError)
			.finally(() => {
				setProcessing(false);
			});
	};

	return (
		<>
			{processing && <PageCenteredProgress />}
			<Layout>
				<Card
					title="Welcome back!"
					subheader="Log in to continue."
					content={
						<div style={{ marginTop: "24px" }}>
							<TextField
								label="Email"
								fullWidth
								variant="standard"
								value={user?.email}
								type="email"
								InputLabelProps={{
									style: { color: "#a1a4ad" },
								}}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
							<TextField
								label="Password"
								fullWidth
								variant="standard"
								type="password"
								sx={{ marginTop: "8px" }}
								value={user?.password}
								InputLabelProps={{
									style: { color: "#a1a4ad" },
								}}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
							<TextButton
								sx={{ marginTop: "24px" }}
								text="Don’t have an account? Sign up."
								onClick={() => navigate("/signup")}
							/>
						</div>
					}
					actions={
						<Button
							variant="contained"
							fullWidth
							sx={{ textTransform: "none", mx: "18px", mt: "50px", mb: "63px" }}
							onClick={() => handleLogin()}
						>
							Log In
						</Button>
					}
				></Card>
			</Layout>
		</>
	);
}
