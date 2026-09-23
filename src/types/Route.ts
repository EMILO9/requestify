import type { Handler } from "./Handler";
import type { HTTPMethod } from "./HTTPMethod";

export type Route = {
  path: string;
  methods: HTTPMethod[];
  middleware?: Handler[];
  handler: Handler;
};
