import type { RequestifyTypes } from "~requestify-types";

export type TNotFoundHandler = RequestifyTypes.GenericHandler<
	void,
	{ errorHandler: RequestifyTypes.ErrorInvoker }
>;
