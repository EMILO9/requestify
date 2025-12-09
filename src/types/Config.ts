import type { RequestifyTypes } from "~requestify-types";

export type TConfig = {
	data: Record<string, unknown>;
	routes: RequestifyTypes.Route[];
	global_middleware: RequestifyTypes.Handler<
		void | boolean,
		{
			errorHandler: (error: unknown) => void | Promise<void>;
			params: RequestifyTypes.MatchResult["params"];
		}
	>[];
	error_handler: RequestifyTypes.Handler<void, { error: unknown }>;
	not_found_handler: RequestifyTypes.Handler<
		void,
		{ errorHandler: (error: unknown) => void | Promise<void> }
	>;
};
