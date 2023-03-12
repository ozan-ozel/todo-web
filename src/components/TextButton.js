import { Typography } from "@mui/material";
import React from "react";

export default function TextButton({ onClick, text, sx}) {
	return (
		<Typography sx={{ fontSize: "14px", textDecoration: "underline", cursor: "pointer", ...sx }} onClick={onClick}>
			{text}
    </Typography>
	);
}
