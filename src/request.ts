import type { IncomingMessage } from "node:http";
import type { MatchResult } from "path-to-regexp";
import qs from "qs";
import type { HttpMethod } from "./types";

export default function request(req: IncomingMessage) {
  const url = new URL(req.url!, "http://_");
  return {
    raw: req,
    path: url.pathname,
    method: req.method! as HttpMethod,
    query: qs.parse(url.search, { ignoreQueryPrefix: true }) as {
      [key: string]: unknown;
    },
    params: {} as Partial<Record<string, string | string[]>>,
  };
}

export type Request = ReturnType<typeof request>;
