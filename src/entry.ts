import type { RequestifyTypes } from "~requestify-types";
import type { DeepPartial } from "utility-types";
export type { RequestifyTypes };

import { createServer, type Server } from "node:http";
import { Validate } from "@core/validate";
import { Request } from "@core/req";
import { Response } from "@core/res";
import { FindMatch } from "@core/findMatch";
import { ExecHandlers } from "@core/ExecHandlers";

export function Requestify<const D extends object>(
	config?: DeepPartial<RequestifyTypes.Config<D>>,
): Server {
	const validated = Validate(config);
	const server = createServer(async (_req, _res) => {
		const req = Request(_req);
		const res = Response(_res);
		const context = { req, res, data: validated.data };
		const match = FindMatch(validated.routes, req);
		if (match) {
			return await ExecHandlers({
				...context,
				match,
				config: validated,
			});
		}
		await validated.not_found_handler({
			...context,
			errorHandler: (error) =>
				validated.error_handler({
					...context,
					error,
				}),
		});
	});
	return server;
}
