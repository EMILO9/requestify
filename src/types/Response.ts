import type { ServerResponse } from "node:http";
import type { SerializeOptions } from "cookie";

export interface Response {
  raw: ServerResponse;
  status(code: number): this;
  setHeader(name: string, value: string | string[]): this;
  json(data: unknown): void;
  send(data: string | Buffer): void;
  cookie(name: string, value: string, options?: SerializeOptions): this;
  redirect(url: string): void;
  clearCookie(name: string, options?: SerializeOptions): this;
}
