import type { RequestifyTypes } from "~requestify-types";

export type TMiddleware<D> = RequestifyTypes.GenericHandler<
	void | boolean,
	{
		errorHandler: RequestifyTypes.ErrorInvoker;
		params: RequestifyTypes.MatchResult["params"];
		data: D;
	}
>;
