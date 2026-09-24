import type { Namespaces } from "@/types/Namespaces";
import urlJoin from "url-join";
import { createRouter } from "radix3";

export function router(namespaces: Namespaces) {
  const routeEntries = Object.entries(namespaces).reduce(
    (acc, [prefix, { middleware = [], routes = [] }]) => {
      for (const route of routes) {
        const fullPath = urlJoin(prefix, route.path);
        acc[fullPath] = {
          ...route,
          middleware: [...middleware, ...(route.middleware ?? [])],
        };
      }
      return acc;
    },
    {} as Record<string, any>,
  );
  return createRouter({ routes: routeEntries });
}
