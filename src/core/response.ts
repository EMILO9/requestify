import { ServerResponse } from "node:http";
import * as cookie from "cookie";
import type { Response } from "@/types/Response";

export function response(res: ServerResponse): Response {
  return {
    raw: res,
    status(code: number) {
      res.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string | string[]) {
      res.setHeader(name, value);
      return this;
    },
    json(data: unknown) {
      if (!res.hasHeader("Content-Type")) {
        this.setHeader("Content-Type", "application/json; charset=utf-8");
      }
      res.end(JSON.stringify(data));
    },
    send(data: string | Buffer) {
      if (!res.hasHeader("Content-Type")) {
        this.setHeader("Content-Type", "text/plain; charset=utf-8");
      }
      res.end(data);
    },
    cookie(name: string, value: string, options?: cookie.SerializeOptions) {
      const serialized = cookie.stringifySetCookie({ name, value, ...options });
      const existing = res.getHeader("Set-Cookie");
      const prev = !existing
        ? []
        : Array.isArray(existing)
          ? existing
          : [String(existing)];
      res.setHeader("Set-Cookie", [...prev, serialized]);
      return this;
    },
    redirect(url: string) {
      const code = res.statusCode === 200 ? 302 : res.statusCode;
      res.statusCode = code;
      res.setHeader("Location", url);
      res.end();
    },
    clearCookie(name: string, options?: cookie.SerializeOptions) {
      return this.cookie(name, "", {
        ...options,
        maxAge: 0,
        expires: new Date(0),
      });
    },
  };
}
