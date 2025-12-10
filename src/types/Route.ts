import type { RequestifyTypes } from "~requestify-types";

export type TRoute<D> = {
	path: string;
	method: RequestifyTypes.Methods;
	handler: RequestifyTypes.Handler<D>;
	middleware: RequestifyTypes.Middleware<D>[];
};
