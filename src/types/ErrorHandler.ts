import type { Request } from "@/core/request";
import type { Response } from "@/core/response";

export type ErrorHandler = (context: {
  req: Request;
  res: Response;
  error: any;
}) => any | Promise<any>;
