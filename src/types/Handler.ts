import type { RequestifyTypes } from "~requestify-types";

export type THandler<T, E> = (
	ctx: E & {
		req: RequestifyTypes.Request;
		res: RequestifyTypes.Response;
		data: RequestifyTypes.Config["data"];
	},
) => T | Promise<T>;
