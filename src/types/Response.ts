import type { ServerResponse } from "node:http";
export type TResponse = {
	_res: ServerResponse;
	status: (code: number) => TResponse;
	json: (data: unknown) => void;
	text: (data: string) => void;
};
