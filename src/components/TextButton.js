import React from "react";

import { Typography } from "@mui/material";

export default function TextButton({ onClick, text, sx }) {
	return (
		<Typography sx={{ fontSize: "14px", textDecoration: "underline", cursor: "pointer", ...sx }} onClick={onClick}>
			{text}
		</Typography>
	);
}
