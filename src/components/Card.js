import React from "react";

import {
	Card as MuiCard,
	CardHeader as MuiCardHeader,
	CardContent as MuiCardContent,
	CardActions as MuiCardActions,
	Typography,
} from "@mui/material";

import { Logo } from "images";

export default function Card({ title, subheader, content, actions }) {
	return (
		<MuiCard
			sx={{
				minWidth: "390px",
				maxWidth: "440px",
				boxShadow: "0 2px 16px 0 rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
			}}
		>
			<MuiCardHeader avatar={<Logo />} sx={{ padding: "35px 30px 8px 30px" }} />
			<MuiCardContent sx={{ padding: "8px 30px 8px 30px" }}>
				<Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>{title}</Typography>
				<Typography sx={{ marginTop: "8px", fontSize: "16px", color: (theme) => theme.palette.text.secondary }}>
					{subheader}
				</Typography>
        {content}
			</MuiCardContent>
      <MuiCardActions>
        {actions}
      </MuiCardActions>
		</MuiCard>
	);
}
