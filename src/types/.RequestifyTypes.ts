import type { TConfig } from "~types/Config";
import type { TRoute } from "~types/Route";
import type { TMethods } from "~types/Methods";
import type { TRequest } from "~types/Request";
import type { TResponse } from "~types/Response";
import type { TGenericHandler } from "~types/GenericHandler";
import type { TMatchResult } from "~types/MatchResult";
import type { THandler } from "~types/Handler";
import type { TMiddleware } from "~types/Middleware";
import type { TErrorHandler } from "~types/ErrorHandler";
import type { TNotFoundHandler } from "~types/NotFoundHandler";
import type { TErrorInvoker } from "~types/ErrorInvoker";

export namespace RequestifyTypes {
	export type Config<D = object> = TConfig<D>;
	export type Route<D = object> = TRoute<D>;
	export type Methods = TMethods;
	export type Request = TRequest;
	export type Response = TResponse;
	export type GenericHandler<T, E extends object = {}> = TGenericHandler<T, E>;
	export type MatchResult = TMatchResult;
	export type Handler<D = object> = THandler<D>;
	export type Middleware<D = object> = TMiddleware<D>;
	export type ErrorHandler<D = object> = TErrorHandler<D>;
	export type NotFoundHandler<D = object> = TNotFoundHandler<D>;
	export type ErrorInvoker = TErrorInvoker;
}
