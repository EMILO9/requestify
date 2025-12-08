
# Requestify
Requestify is a lightweight Node.js HTTP framework for building server routes with full TypeScript support. It provides:

Global and route-level middleware with async/Promise support

Custom error handling for all routes

Simple route handlers with typed request, response, and parameters

Convenient response helpers for JSON and plain text

It’s designed to be minimal, type-safe, and easy to use, giving you a structured way to handle HTTP requests without the overhead of larger frameworks.

## Usage/Examples

```javascript
import { Requestify } from "requestify";

const server = Requestify({
  global_middleware: [
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
      }),
  ],
  routes: [
    {
      path: "/users/:id",
      method: "GET",
      handler: ({ res }) => res.status(200).text("Hello world!"),
      middleware: [],
    },
  ],
  error_handler: ({ error, res }) => res.status(500).text(`Error: ${error}`),
});

server.listen(3000);
```


