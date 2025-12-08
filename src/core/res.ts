import type { RequestifyTypes } from "~requestify-types";
import type { ServerResponse } from "node:http";

export function Response(res: ServerResponse): RequestifyTypes.Response {
	return {
		_res: res,
		status(code) {
			res.statusCode = code;
			return this;
		},
		json(data) {
			const jsonString = JSON.stringify(data);
			res.setHeader("Content-Type", "application/json; charset=utf-8");
			res.setHeader("Content-Length", Buffer.byteLength(jsonString));
			res.end(jsonString);
		},
		text(data) {
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.setHeader("Content-Length", Buffer.byteLength(data));
			res.end(data);
		},
	};
}
