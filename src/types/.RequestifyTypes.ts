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
	export type Config = TConfig;
	export type Route = TRoute;
	export type Methods = TMethods;
	export type Request = TRequest;
	export type Response = TResponse;
	export type GenericHandler<T, E extends object = {}> = TGenericHandler<T, E>;
	export type MatchResult = TMatchResult;
	export type Handler = THandler;
	export type Middleware = TMiddleware;
	export type ErrorHandler = TErrorHandler;
	export type NotFoundHandler = TNotFoundHandler;
	export type ErrorInvoker = TErrorInvoker;
}
