import { Handler } from "@/main";
import getRawBody from "raw-body";
import { parse as parseQuery } from "qs";

export default function (options?: { limit?: string | number | null }) {
  return Handler(async ({ req }) => {
    const raw = await getRawBody(req.raw, {
      length: req.headers["content-length"],
      limit: options?.limit ?? "1mb",
      encoding: "utf-8",
    });
    req.body = parseQuery(raw);
  });
}
