import type { RequestifyTypes } from "~requestify-types";
import type { IncomingMessage } from "node:http";
import { URL } from "node:url";

export function Request(req: IncomingMessage): RequestifyTypes.Request {
	const url = new URL(req.url ?? "/", "http://_");
	return {
		_req: req,
		url: url.pathname,
		method: (req.method ?? "GET") as RequestifyTypes.Methods,
	};
}
