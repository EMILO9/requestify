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

import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";

export function CreateRequest(req: IncomingMessage) {
  const url = new URL(req.url ?? "/", `http://_`);
  const method = req.method ?? "GET";
  return {
    raw: req,
    url: url.pathname,
    method,
    route: {
      prefix: "",
      relative_path: "",
      full_path: ""
      params: {} as Record<string, string | string[]>,
    },
  };
}

export function CreateResponse(res: ServerResponse) {
  return { raw: res };
}

export type Handler = (context: {
  req: ReturnType<typeof CreateRequest>;
  res: ReturnType<typeof CreateResponse>;
}) => any | Promise<any>;

export type Route = {
  path: string;
  methods: HttpMethod[];
  middleware: Handler[];
  handler: Handler;
};

export type GroupConfig = [GroupMiddleware: Handler[], GroupRoutes: Route[]];

export type RouteGroupMap = Record<string, GroupConfig>;

import urlJoin from "url-join";
import { match, type MatchResult } from "path-to-regexp";

export function CompileRoutes(routeGroupMap: RouteGroupMap) {
  return Object.entries(routeGroupMap)
    .map(([prefix, [middleware, routes]]) => {
      return routes.map((route) => {
        const fullPath = urlJoin(prefix, route.path);
        return {
          prefix,
          full_path: fullPath,
          relative_path: route.path,
          chain: [...middleware, ...route.middleware, route.handler],
          match: match(fullPath),
          supportsMethod: (httpMethod: HttpMethod) => {
            return route.methods.includes(httpMethod);
          },
        };
      });
    })
    .flat();
}

export function Requestify(routeGroupMap: RouteGroupMap): Server {
  const routes = CompileRoutes(routeGroupMap);
  return createServer(async (rawReq, rawRes) => {
    const req = CreateRequest(rawReq);
    const res = CreateResponse(rawRes);
    for (const route of routes) {
      if (!route.supportsMethod(req.method as HttpMethod)) continue;
      const match = route.match(req.url);
      if (!match) continue;
      req.route = {
        prefix: route.prefix,
        path: route.path,
        params: match.params as Record<string, string | string[]>,
      };
      for (const fn of route.chain) {
        const result = await fn({ req, res });
        if (result === false) break;
      }
      return;
    }
    res.raw.statusCode = 404;
    res.raw.end("Not Found");
  });
}
