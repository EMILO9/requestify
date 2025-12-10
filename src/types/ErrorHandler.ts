import type { RequestifyTypes } from "~requestify-types";

export type TErrorHandler = RequestifyTypes.GenericHandler<
	void,
	{ error: unknown }
>;
