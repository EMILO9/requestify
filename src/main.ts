import {
  type ServerResponse,
  type IncomingMessage,
  createServer,
} from "node:http";
import { createRouter } from "radix3";
import urlJoin from "url-join";
import {
  parseCookie,
  type Cookies,
  type StringifyOptions,
  stringifySetCookie,
  type SetCookie,
} from "cookie";
import { parse as parseQuery, type ParsedQs } from "qs";
import { pipeline } from "node:stream/promises";
import { createReadStream } from "node:fs";
import { basename } from "node:path";
import pkg from "@root/package.json";

export { default as json } from "@/mw/json";
export { default as text } from "@/mw/text";
export { default as urlencoded } from "@/mw/urlencoded";
export { default as raw } from "@/mw/raw";
export { default as multipart } from "@/mw/multipart";

export const HTTP_METHODS = [
  "ACL",
  "BIND",
  "CHECKOUT",
  "CONNECT",
  "COPY",
  "DELETE",
  "GET",
  "HEAD",
  "LINK",
  "LOCK",
  "M-SEARCH",
  "MERGE",
  "MKACTIVITY",
  "MKCALENDAR",
  "MKCOL",
  "MOVE",
  "NOTIFY",
  "OPTIONS",
  "PATCH",
  "POST",
  "PROPFIND",
  "PROPPATCH",
  "PURGE",
  "PUT",
  "QUERY",
  "REBIND",
  "REPORT",
  "SEARCH",
  "SOURCE",
  "SUBSCRIBE",
  "TRACE",
  "UNBIND",
  "UNLINK",
  "UNLOCK",
  "UNSUBSCRIBE",
] as const;

export type HTTPMethod = (typeof HTTP_METHODS)[number];

export interface Request {
  raw: IncomingMessage;
  url: string;
  method: HTTPMethod;
  params: Record<string, any>;
  headers: IncomingMessage["headers"];
  cookies: Cookies;
  query: ParsedQs;
  body?: any;
}

export interface Response {
  raw: ServerResponse;
  status(code: number): Response;
  header(name: string, value: string | string[]): Response;
  cookie(cookie: SetCookie, options?: StringifyOptions): Response;
  json(data: any): void;
  text(text: string): void;
  buffer(buf: Buffer | Uint8Array, contentType?: string): void;
  redirect(url: string, status: number): void;
  download(filePath: string, filename?: string): Promise<void>;
  clearCookie(cookie: SetCookie, options?: StringifyOptions): Response;
}

export type Handler<TReq = {}, TRes = {}> = (context: {
  req: Request & TReq;
  res: Response & TRes;
}) => any | Promise<any>;

export type Route = {
  path?: string;
  methods?: HTTPMethod[];
  middleware?: Handler[];
  handler: Handler;
};

export type RouterItem = { route: Required<Route>; groupMiddleware: Handler[] };

export type RouteGroupConfig = {
  groupMiddleware?: Handler[];
  routes?: Route[];
};

export type RouteGroup = Record<string, RouteGroupConfig>;

export type ErrorHandler<TReq = {}, TRes = {}> = (context: {
  req: Request & TReq;
  res: Response & TRes;
  error: any;
}) => any | Promise<any>;

export type Config = {
  globalMiddleware?: Handler[];
  routeGroup?: RouteGroup;
  port?: number;
  notFound?: Handler; // <--- Added here
  errorHandler?: ErrorHandler;
};

export function Handler<TReq = {}, TRes = {}>(
  handler: Handler<TReq, TRes>,
): Handler<TReq, TRes> {
  return handler;
}

export function ErrorHandler<TReq = {}, TRes = {}>(
  handler: ErrorHandler<TReq, TRes>,
): ErrorHandler<TReq, TRes> {
  return handler;
}

function Request(req: IncomingMessage): Request {
  const { url = "/", method = "GET", headers } = req;
  const { pathname, search } = new URL(url, "http://_");
  const cookies = parseCookie(headers.cookie ?? "");
  const query = parseQuery(search, { ignoreQueryPrefix: true });
  return {
    raw: req,
    url: pathname,
    method: method as HTTPMethod,
    params: {},
    headers,
    cookies,
    query,
  };
}

function Response(res: ServerResponse): Response {
  return {
    raw: res,
    status(code) {
      res.statusCode = code;
      return this;
    },
    header(name, value) {
      res.setHeader(name, value);
      return this;
    },
    cookie(cookie, options) {
      const cookieStr = stringifySetCookie(cookie, options);
      const existing = res.getHeader("Set-Cookie");
      res.setHeader(
        "Set-Cookie",
        !existing
          ? cookieStr
          : Array.isArray(existing)
            ? [...existing, cookieStr]
            : [existing.toString(), cookieStr],
      );
      return this;
    },
    json(data) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    },
    text(text) {
      res.setHeader("Content-Type", "text/plain");
      res.end(text);
    },
    buffer(buf, contentType = "application/octet-stream") {
      res.setHeader("Content-Type", contentType);
      res.end(buf);
    },
    redirect(url, status = 302) {
      res.statusCode = status;
      res.setHeader("Location", url);
      res.end();
    },
    clearCookie(cookie, options) {
      this.cookie(
        { ...cookie, value: "", maxAge: 0, expires: new Date(0) },
        options,
      );
      return this;
    },
    async download(filePath, filename) {
      const name = filename || basename(filePath);
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
      res.setHeader("Content-Type", "application/octet-stream");
      await pipeline(createReadStream(filePath), res);
    },
  };
}

export default function Requestify(config?: Config) {
  const {
    globalMiddleware = [],
    routeGroup = {},
    port = 3000,
    notFound, // <--- Destructured here
    errorHandler,
  } = config ?? {};

  const router = createRouter<RouterItem>();

  for (const [prefix, groupConfig] of Object.entries(routeGroup)) {
    const { groupMiddleware = [], routes = [] } = groupConfig;
    for (const route of routes) {
      const { middleware = [], path = "/", methods = ["GET"] } = route;
      const fullPath = urlJoin(prefix, path);
      for (const method of methods) {
        router.insert(`${method}:${fullPath}`, {
          groupMiddleware,
          route: { ...route, path, methods, middleware },
        });
      }
    }
  }

  const server = createServer();
  server.on("request", async (req, res) => {
    const request = Request(req);
    const response = Response(res);
    res.setHeader("X-Powered-By", `Requestify/${pkg.version}`);
    let matched = false;
    const fns = [...globalMiddleware];

    const match = router.lookup(`${request.method}:${request.url}`);
    if (match) {
      matched = true;
      request.params = match.params ?? {};
      fns.push(
        ...match.groupMiddleware,
        ...match.route.middleware,
        match.route.handler,
      );
    }

    if (!matched) {
      if (notFound) {
        fns.push(notFound);
      } else {
        fns.push(({ res }) => {
          res.status(404).text("404: Not Found");
        });
      }
    }

    for (const fn of fns) {
      try {
        await fn({ req: request, res: response });
        if (response.raw.headersSent) break;
      } catch (error) {
        if (errorHandler) {
          await errorHandler({ req: request, res: response, error });
        } else if (!response.raw.headersSent) {
          response.status(500).text("500: Internal Server Error");
        }
        break;
      }
    }
  });

  return {
    server,
    port,
    listen(): Promise<void> {
      return new Promise((resolve, reject) => {
        server.listen(port, () => resolve());
        server.once("error", reject);
      });
    },
    close(): Promise<void> {
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
  };
}
