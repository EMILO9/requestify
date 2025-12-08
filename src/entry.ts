import type { RequestifyTypes } from "~requestify-types";
import type { DeepPartial } from "utility-types";
export type { RequestifyTypes };

import { createServer, type Server } from "node:http";
import { Validate } from "@core/validate";
import { Request } from "@core/req";
import { Response } from "@core/res";
import { FindMatch } from "@core/findMatch";
import { ExecHandlers } from "@core/ExecHandlers";

export function Requestify(
	config?: DeepPartial<RequestifyTypes.Config>,
): Server {
	const validated = Validate(config);
	const data = Object.freeze(validated.data); // make it fully immutable with immutable js later, same goes for the entire config.
	const server = createServer(async (_req, _res) => {
		const req = Request(_req);
		const res = Response(_res);
		const match = FindMatch(validated.routes, req);
		if (match) {
			return await ExecHandlers({
				req,
				res,
				match,
				config: validated,
				data,
			});
		}
		validated.not_found_handler({
			req,
			res,
			data,
			errorHandler: (error) =>
				validated.error_handler({
					req,
					res,
					error,
					data,
				}),
		});
	});
	return server;
}
