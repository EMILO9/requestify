import type { RequestifyTypes } from "~requestify-types";

export type TRoute = {
	path: string;
	method: RequestifyTypes.Methods;
	handler: RequestifyTypes.Handler<
		void,
		{
			errorHandler: (error: unknown) => void | Promise<void>;
			params: RequestifyTypes.MatchResult["params"];
		}
	>;
	middleware: RequestifyTypes.Handler<
		void | boolean,
		{
			errorHandler: (error: unknown) => void | Promise<void>;
			params: RequestifyTypes.MatchResult["params"];
		}
	>[];
};
