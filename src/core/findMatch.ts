import type { RequestifyTypes } from "~requestify-types";
import * as ptr from "path-to-regexp";

export function FindMatch(
	routes: RequestifyTypes.Route[],
	req: RequestifyTypes.Request,
): RequestifyTypes.MatchResult | null {
	for (const route of routes) {
		if (route.method !== req.method) continue;
		const matcher = ptr.match(route.path);
		const match = matcher(req.url);
		if (match) {
			return { route, params: match.params };
		}
	}
	return null;
}
