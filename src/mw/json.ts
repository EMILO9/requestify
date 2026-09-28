import { Handler, type Request } from "@/main";
import getRawBody from "raw-body";
import destr from "destr";

export default function (options?: { limit?: string | number | null }) {
  return Handler(async ({ req, res }) => {
    try {
      const raw = await getRawBody(req.raw, {
        length: req.raw.headers["content-length"],
        limit: options?.limit ?? "1mb",
        encoding: "utf-8",
      });
      req.body = destr(raw);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });
}
