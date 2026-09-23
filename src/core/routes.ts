import type { Namespaces } from "@/types/Namespaces";
import { match } from "path-to-regexp";
import urlJoin from "url-join";

export function getRoutes(namespaces: Namespaces) {
  return Object.entries(namespaces)
    .map(([prefix, { middleware = [], routes }]) => {
      return (routes ?? []).map((route) => ({
        ...route,
        middleware: [...middleware, ...(route.middleware ?? [])],
        namespace: prefix,
        fullPath: urlJoin(prefix, route.path),
        match: match(urlJoin(prefix, route.path)),
      }));
    })
    .flat();
}
