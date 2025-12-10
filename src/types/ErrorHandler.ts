import type { RequestifyTypes } from "~requestify-types";

export type TErrorHandler<D> = RequestifyTypes.GenericHandler<
	void,
	{ error: unknown; data: D }
>;
