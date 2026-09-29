import { Handler } from "@/main";
import getRawBody from "raw-body";

export default function (options?: { limit?: string | number | null }) {
  return Handler(async ({ req }) => {
    req.body = await getRawBody(req.raw, {
      length: req.headers["content-length"],
      limit: options?.limit ?? "5mb",
      encoding: null,
    });
  });
}
