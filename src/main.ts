import { createServer } from "node:http";
import type { Config } from "./types/Config";
import { request } from "./core/request";
import { response } from "./core/response";
import pkg from "@root/package.json";
import { getRoutes } from "./core/routes";

export default function Requestify(config: Config) {
  const { namespaces, middleware, errorHandler } = config;
  const routes = getRoutes(namespaces);
  return createServer(async (_req, _res) => {
    const req = request(_req);
    const res = response(_res);
    res.setHeader("X-Powered-By", `Requestify/${pkg.version}`);
    const execChain = [...(middleware ?? [])];
    let matched = false;
    for (const route of routes) {
      const match = route.match(req.path);
      if (match && route.methods.includes(req.method)) {
        execChain.push(...route.middleware, route.handler);
        req.params = match.params;
        matched = true;
        break;
      }
    }
    if (!matched) {
      execChain.push(async ({ req, res }) => {
        res.status(404).send("404: Not Found");
      });
    }
    try {
      for (const fn of execChain) {
        const result = await fn({ req, res });
        if (result === false) break;
      }
    } catch (error) {
      if (errorHandler) {
        await errorHandler({ req, res, error });
      } else {
        res.status(500).send("500: Internal Server Error");
      }
    }
  });
}
