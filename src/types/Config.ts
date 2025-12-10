import type { RequestifyTypes } from "~requestify-types";

export type TConfig<D> = {
	data: D;
	routes: RequestifyTypes.Route<D>[];
	global_middleware: RequestifyTypes.Middleware<D>[];
	error_handler: RequestifyTypes.ErrorHandler<D>;
	not_found_handler: RequestifyTypes.NotFoundHandler<D>;
};
