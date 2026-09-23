import type { Namespaces } from "./Namespaces";
import type { Handler } from "./Handler";
import type { ErrorHandler } from "./ErrorHandler";

export type Config = {
  middleware?: Handler[];
  namespaces: Namespaces;
  errorHandler?: ErrorHandler;
};
