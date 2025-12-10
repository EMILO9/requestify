import type { RequestifyTypes } from "~requestify-types";

export type TNotFoundHandler<D> = RequestifyTypes.GenericHandler<
	void,
	{ errorHandler: RequestifyTypes.ErrorInvoker; data: D }
>;
