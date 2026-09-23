import { IncomingMessage } from "node:http";
import qs from "qs";
import * as cookie from "cookie";
import type { HTTPMethod } from "@/types/HTTPMethod";

export function request(req: IncomingMessage) {
  const url = new URL(req.url!, "http://_");
  return {
    raw: req,
    path: url.pathname,
    method: req.method! as HTTPMethod,
    headers: req.headers,
    query: qs.parse(url.search, { ignoreQueryPrefix: true }),
    params: {} as Partial<Record<string, string | string[]>>,
    cookies: cookie.parseCookie(req.headers.cookie || ""),
  };
}

export type Request = ReturnType<typeof request>;
