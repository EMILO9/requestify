import type { Handler } from "./Handler";
import type { Route } from "./Route";

export type NamespaceConfig = { middleware?: Handler[]; routes?: Route[] };
