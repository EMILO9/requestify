import type { Request } from "@/types/Request";
import type { Response } from "@/types/Response";

export type Handler = (context: {
  req: Request;
  res: Response;
}) => any | Promise<any>;
