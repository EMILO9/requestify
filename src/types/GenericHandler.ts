import type { RequestifyTypes } from "~requestify-types";

export type TGenericHandler<T, E> = (
	ctx: E & {
		req: RequestifyTypes.Request;
		res: RequestifyTypes.Response;
	},
) => T | Promise<T>;
