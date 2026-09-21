import type { Request } from "./request";
import type { Response } from "./response";

export type HttpMethod =
  | "ACL"
  | "BIND"
  | "CHECKOUT"
  | "CONNECT"
  | "COPY"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "LINK"
  | "LOCK"
  | "M-SEARCH"
  | "MERGE"
  | "MKACTIVITY"
  | "MKCALENDAR"
  | "MKCOL"
  | "MOVE"
  | "NOTIFY"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PROPFIND"
  | "PROPPATCH"
  | "PURGE"
  | "PUT"
  | "QUERY"
  | "REBIND"
  | "REPORT"
  | "SEARCH"
  | "SOURCE"
  | "SUBSCRIBE"
  | "TRACE"
  | "UNBIND"
  | "UNLINK"
  | "UNLOCK"
  | "UNSUBSCRIBE";

export type Handler = (context: {
  req: Request;
  res: Response;
}) => any | Promise<any>;

export type Route = {
  path: string;
  methods: HttpMethod[];
  middleware: Handler[];
  handler: Handler;
};

export type GroupConfig = { group_middleware: Handler[]; routes: Route[] };

export type Groups = Record<string, GroupConfig>;

export type ErrorHandler = (context: {
  req: Request;
  res: Response;
  error: any;
}) => any | Promise<any>;

export type Config = {
  global_middleware: Handler[];
  error_handler: ErrorHandler;
  groups: Groups;
};
