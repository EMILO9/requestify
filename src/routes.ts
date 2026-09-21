import { match } from "path-to-regexp";
import urlJoin from "url-join";
import type { Groups } from "./types";

export function compileRoutes(groups: Groups) {
  return Object.entries(groups).flatMap(([prefix, groupConfig]) => {
    return groupConfig.routes.map((route) => ({
      ...route,
      group_middleware: groupConfig.group_middleware,
      isMatch: match(urlJoin(prefix, route.path)),
    }));
  });
}
