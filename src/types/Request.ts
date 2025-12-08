import type { IncomingMessage } from "node:http";
import type { RequestifyTypes } from "~requestify-types";

export type TRequest = {
	[key: string]: unknown;
	_req: IncomingMessage;
	method: RequestifyTypes.Methods;
	url: string;
};
