import type { RequestifyTypes } from "~requestify-types";

export type THandler<D> = RequestifyTypes.GenericHandler<
	void,
	{
		errorHandler: RequestifyTypes.ErrorInvoker;
		params: RequestifyTypes.MatchResult["params"];
		data: D;
	}
>;
