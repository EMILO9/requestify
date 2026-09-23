import type { Request } from "@/core/request";
import type { Response } from "@/core/response";

export type Handler = (context: {
  req: Request;
  res: Response;
}) => any | Promise<any>;
