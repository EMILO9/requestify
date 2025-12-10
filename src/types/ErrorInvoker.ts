import type { RequestifyTypes } from "~requestify-types";

type Error = Parameters<RequestifyTypes.ErrorHandler>[0]["error"];
type Return = ReturnType<RequestifyTypes.ErrorHandler>;
export type TErrorInvoker = (error: Error) => Return;
