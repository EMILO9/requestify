import type { ServerResponse } from "node:http";

export default function response(res: ServerResponse) {
  return { raw: res };
}

export type Response = ReturnType<typeof response>;
