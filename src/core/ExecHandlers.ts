import type { RequestifyTypes } from "~requestify-types";

export async function ExecHandlers(data: {
	config: RequestifyTypes.Config;
	req: RequestifyTypes.Request;
	res: RequestifyTypes.Response;
	match: RequestifyTypes.MatchResult;
	data: RequestifyTypes.Config["data"];
}): Promise<void> {
	const { req, res, match, config } = data;
	const { route, params } = match;
	const handlers = [
		...config.global_middleware,
		...route.middleware,
		route.handler,
	];
	for (const handler of handlers) {
		const result = !!(await handler({
			data: config.data,
			req,
			res,
			params,
			errorHandler: (error) =>
				config.error_handler({ error, req, res, data: config.data }),
		}));
		if (!result) return;
	}
}
