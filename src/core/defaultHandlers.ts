import type { RequestifyTypes } from "~requestify-types";

export const default_handler: RequestifyTypes.Handler = ({ req, res }) => {
	res.status(200).json({ url: req.url, method: req.method });
};

export const default_error_handler: RequestifyTypes.ErrorHandler = ({
	res,
	error,
}) => {
	let message: string;
	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = "An unknown error occurred";
	}
	res.status(500).json({ message });
};

export const default_not_found_handler: RequestifyTypes.NotFoundHandler = ({
	req,
	res,
}) => {
	res.status(404).json({
		message: `${req.url} doesn't exist.`,
		method: req.method,
	});
};
