import type { RequestifyTypes } from "~requestify-types";

export type TMiddleware = RequestifyTypes.GenericHandler<
	void | boolean,
	{
		errorHandler: RequestifyTypes.ErrorInvoker;
		params: RequestifyTypes.MatchResult["params"];
	}
>;
