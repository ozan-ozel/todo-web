import React from "react";

import { Grid, Typography } from "@mui/material";

const FilterItem = ({ text, active, onClick }) => {
	return (
		<Typography
			sx={{
				fontSize: "14px",
				...(!active && {
					color: (theme) => theme.palette.primary.main,
					textDecoration: "underline",
					cursor: "pointer",
				}),
			}}
			onClick={onClick}
		>
			{text}
		</Typography>
	);
};
export default function Filter({ selection, onClick }) {
	return (
		<Grid container flexDirection="row" spacing={1} sx={{ml: "16px" }}>
			<Grid item>
				<Typography sx={{ fontSize: "14px", color: (theme) => theme.palette.info.main }}>Show:</Typography>
			</Grid>
			{["All", "Completed", "Incompleted"].map((item, ix) => (
				<Grid item>
					<FilterItem key={ix} text={item} active={selection === item} onClick={() => onClick(item)} />
				</Grid>
			))}
		</Grid>
	);
}
