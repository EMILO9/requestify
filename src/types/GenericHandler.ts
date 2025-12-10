import type { RequestifyTypes } from "~requestify-types";

export type TGenericHandler<T, E> = (
	ctx: E & {
		req: RequestifyTypes.Request;
		res: RequestifyTypes.Response;
		data: RequestifyTypes.Config["data"];
	},
) => T | Promise<T>;
