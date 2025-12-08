import type { RequestifyTypes } from "~requestify-types";

export const default_handler: RequestifyTypes.Route["handler"] = ({
	req,
	res,
	errorHandler,
}) => {
	res.status(200).json(`you sent a request to: ${req.url}`);
};

export const default_error_handler: RequestifyTypes.Config["error_handler"] = ({
	req,
	res,
	error,
}) => {
	if (error instanceof Error) {
		res.status(500).json({ message: error.message });
	}
};

export const default_not_found_handler: RequestifyTypes.Config["not_found_handler"] =
	({ req, res, errorHandler }) => {
		res.status(404).json({ message: `${req.url} doesn't exist.` });
	};
