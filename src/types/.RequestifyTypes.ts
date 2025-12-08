import type { TConfig } from "~types/Config";
import type { TRoute } from "~types/Route";
import type { TMethods } from "~types/Methods";
import type { TRequest } from "~types/Request";
import type { TResponse } from "~types/Response";
import type { THandler } from "~types/Handler";
import type { TMatchResult } from "~types/MatchResult";

export namespace RequestifyTypes {
	export type Config = TConfig;
	export type Route = TRoute;
	export type Methods = TMethods;
	export type Request = TRequest;
	export type Response = TResponse;
	export type Handler<T, E extends object = {}> = THandler<T, E>;
	export type MatchResult = TMatchResult;
}
