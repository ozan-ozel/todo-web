import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Grid, TextField } from "@mui/material";

import Card from "components/Card";
import Layout from "components/Layout";
import PageCenteredProgress from "components/PageCenteredProgress";
import TextButton from "components/TextButton";

import useCatchError from "api/useCatchError";
import { useUserApi } from "api/user";

import { setJwt } from "actions/JwtActions";

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const catchError = useCatchError();

	const [processing, setProcessing] = useState();
	const [user, setUser] = useState();

	const { register } = useUserApi();

	const handleSignUp = () => {
		register(user)
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
					title="Welcome!"
					subheader="Sign up to start using Simpledo today."
					content={
						<Grid container spacing={2} sx={{ mt: "24px" }}>
							<Grid item xs={12}>
								<TextField
									label="Full Name"
									fullWidth
									variant="standard"
									value={user?.fullName}
									type="email"
									InputLabelProps={{
										style: { color: "#a1a4ad" },
									}}
									onChange={(e) => setUser({ ...user, fullName: e.target.value })}
								/>
							</Grid>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Password"
									fullWidth
									variant="standard"
									type="password"
									value={user?.password}
									InputLabelProps={{
										style: { color: "#a1a4ad" },
									}}
									onChange={(e) => setUser({ ...user, password: e.target.value })}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextButton
									sx={{ marginTop: "24px" }}
									text="Do have an account? Sign in."
									onClick={() => navigate("/login")}
								/>
							</Grid>
						</Grid>
					}
					actions={
						<Button
							variant="contained"
							fullWidth
							sx={{ textTransform: "none", mx: "18px", mt: "50px", mb: "63px" }}
							onClick={() => handleSignUp()}
						>
							Sign Up
						</Button>
					}
				></Card>
			</Layout>
		</>
	);
}
