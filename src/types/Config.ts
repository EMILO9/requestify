import type { RequestifyTypes } from "~requestify-types";

export type TConfig = {
	data: Record<string, unknown>;
	routes: RequestifyTypes.Route[];
	global_middleware: RequestifyTypes.Middleware[];
	error_handler: RequestifyTypes.ErrorHandler;
	not_found_handler: RequestifyTypes.NotFoundHandler;
};
