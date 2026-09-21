import { createServer } from "node:http";
import request from "./request";
import response from "./response";
import type { Config, HttpMethod } from "./types";
import { match } from "path-to-regexp";
import urlJoin from "url-join";
import { compileRoutes } from "./routes";

export default function Requestify(config: Config) {
  const { global_middleware, groups, error_handler } = config;
  const routes = compileRoutes(groups);
  return createServer(async (_req, _res) => {
    const req = request(_req);
    const res = response(_res);
    const exec_chain = [...global_middleware];
    let matched = false;
    for (const route of routes) {
      const isMatch = route.isMatch(req.path);
      if (isMatch && route.methods.includes(req.method)) {
        exec_chain.push(
          ...route.group_middleware,
          ...route.middleware,
          route.handler,
        );
        req.params = isMatch.params;
        matched = true;
        break;
      }
    }
    if (!matched) {
      exec_chain.push(async ({ res }) => {
        res.raw.statusCode = 404;
        res.raw.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.raw.end(
          "404 Not Found: It looks like you forgot to add a route for this path (or forgot to handle this HTTP method)!",
        );
      });
    }
    try {
      for (const fn of exec_chain) {
        const result = await fn({ req, res });
        if (result === false) break;
      }
    } catch (error) {
      if (error_handler) {
        await error_handler({ req, res, error });
      } else {
        res.raw.statusCode = 500;
        res.raw.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.raw.end("500 Internal Server Error");
      }
    }
  });
}
