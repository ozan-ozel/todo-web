import { useSnackbar } from "notistack";

import { ApiError } from "./errorHandler";

export default function useCatchError() {
	const { enqueueSnackbar } = useSnackbar();

	return (err) => {
		if (err instanceof ApiError) {
			console.log(JSON.stringify(err));

			enqueueSnackbar(err.message, { variant: "error" });
			return;
		}

		console.log(err);

		enqueueSnackbar("Something went wrong.", { variant: "error" });
	};
}
