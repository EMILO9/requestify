import type { ServerResponse } from "node:http";

export default function response(res: ServerResponse) {
  return {
    raw: res,
    status(code: number) {
      res.statusCode = code;
      return this;
    },
    json(data: any) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(data));
    },
    send(body: string | Buffer) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(body);
    },
  };
}

export type Response = ReturnType<typeof response>;
