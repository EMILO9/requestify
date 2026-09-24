import type { Request } from "@/types/Request";
import type { Response } from "@/types/Response";

export type ErrorHandler = (context: {
  req: Request;
  res: Response;
  error: any;
}) => any | Promise<any>;
