import type { IncomingMessage } from "node:http";
import type { ParsedQs } from "qs";
import type { Cookies } from "cookie";
import type { HTTPMethod } from "@/types/HTTPMethod";

export interface Request {
  raw: IncomingMessage;
  path: string;
  method: HTTPMethod;
  headers: IncomingMessage["headers"];
  query: ParsedQs;
  params: Partial<Record<string, string | string[]>>;
  cookies: Cookies;
}
