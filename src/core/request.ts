import { IncomingMessage } from "node:http";
import qs from "qs";
import * as cookie from "cookie";
import type { HTTPMethod } from "@/types/HTTPMethod";
import type { Request } from "@/types/Request";

export function request(req: IncomingMessage): Request {
  const url = new URL(req.url!, "http://_");
  return {
    raw: req,
    path: url.pathname,
    method: req.method! as HTTPMethod,
    headers: req.headers,
    query: qs.parse(url.search, { ignoreQueryPrefix: true }),
    params: {},
    cookies: cookie.parseCookie(req.headers.cookie || ""),
  };
}
