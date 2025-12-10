import type { RequestifyTypes } from "~requestify-types";

export type TRoute = {
	path: string;
	method: RequestifyTypes.Methods;
	handler: RequestifyTypes.Handler;
	middleware: RequestifyTypes.Middleware[];
};
