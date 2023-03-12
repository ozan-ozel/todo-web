import React from "react";

import { Grid } from "@mui/material";

export default function Layout({ children }) {
	return (
		<Grid container alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
			{children}
		</Grid>
	);
}
