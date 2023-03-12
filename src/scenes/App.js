import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { PrivateRoute } from "components";

import reducer from "actions";

import { configureRedux, default as ReduxProvider } from "utils/Redux";

import { AuthProvider, SnackbarProvider } from "../services";
import Login from "./Login";
import SignUp from "./SignUp";
import { Todo } from "./Todo";
import "./global.css";

const COLOR_SECONDARY = "#6A1FC2";
const COLOR_LIGHTGRAY = "rgba(31, 42, 75, 0.59)";
const COLOR_LIGHTBG = "#F4F5FC";
const COLOR_GRAY = "#AEAEAE";
const COLOR_SUCCESS = "#00CC44";
const COLOR_DANGER = "#DE350B";

const theme = createTheme({
	status: {
		success: COLOR_SUCCESS,
		danger: COLOR_DANGER,
	},
	palette: {
		background: {
			default: "#f6f7f8",
		},
		primary: {
			main: "#4a77e5",
		},
		secondary: {
			main: COLOR_SECONDARY,
		},
		info: {
			main: COLOR_LIGHTGRAY,
			dark: COLOR_GRAY,
			light: COLOR_LIGHTBG,
		},
		success: {
			main: COLOR_SUCCESS,
		},
		danger: {
			main: COLOR_DANGER,
		},
		warning: {
			main: "#FFAB00",
			light: "#FFEECC",
		},
		text: {
			primary: "#1f2a4b",
			secondary: "#a1a4ad",
		},
	},
	typography: {
		allVariants: {
			color: "#1f2a4b",
		},
		fontFamily: ["MarkPro", "sans-serif"].join(","),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: "none",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					boxShadow: "none",
				},
			},
		},
	},
});

const { persistor, store } = configureRedux(reducer, {
	key: "todo:todo-web",
	whitelist: ["jwt"],
});

export default function App() {
	return (
		<ReduxProvider persistor={persistor} store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SnackbarProvider>
					<AuthProvider>
						<Suspense fallback={<CircularProgress />}>
							<Router>
								<Routes>
									<Route path="*" element={<PrivateRoute />}>
										<Route path="" element={<Todo />} />
										<Route path="todo" element={<Todo />} />
									</Route>
									<Route path="signup" element={<SignUp />} />
									<Route path="login" element={<Login />} />
								</Routes>
							</Router>
						</Suspense>
					</AuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</ReduxProvider>
	);
}
