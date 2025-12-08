import type { RequestifyTypes } from "~requestify-types";

export type TMatchResult = {
	route: RequestifyTypes.Route;
	params: Partial<Record<string, string | string[]>>;
};
