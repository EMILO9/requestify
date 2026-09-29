# Requestify 🚀

A lightweight, type-safe, modular HTTP framework for Node.js built with native HTTP, Radix3 routing, and modern TypeScript support.

## Features

- **Type-Safe Routing & Handlers**: Full type inference for route parameters, query strings, and custom context extensions.
- **Robust Cookie Management**: Seamless parsing, setting, and clearing of cookies using modern helper utilities.
- **Flexible Response Lifecycle**: Terminal helpers for JSON, plain text, binary buffers, redirects, and local file downloads.
- **Middleware & Route Grouping**: Organize routes easily with global middleware, group-level middleware, and custom path prefixes using `url-join`.
- **Centralized Error Handling**: Built-in 404 and 500 error interception hooks.

---

## Installation

```bash
npm install requestify
```

---

## Quick Start

```ts
import Requestify, { Handler } from "requestify";

const app = Requestify({
  port: 3000,
  routeGroup: {
    "/api": {
      routes: [
        {
          path: "/hello",
          methods: ["GET"],
          handler: Handler(({ req, res }) => {
            return res.json({ message: "Hello from Requestify!" });
          }),
        },
      ],
    },
  },
});

await app.listen();
console.log(`Server running on port ${app.port}`);
```

---

## API Reference & Examples

### 1. Sending Responses & Method Chaining

Most response builder methods return `res` to allow method chaining, while terminal methods close the HTTP response lifecycle:

- **Chaining Headers & Status**: `res.status(200).header("X-Custom", "value").json({ success: true })`
- **JSON**: `res.json({ success: true })`
- **Text**: `res.text("Plain text response")`
- **Buffer**: `res.buffer(binaryData, "image/png")`
- **Redirect**: `res.redirect("/login", 302)`
- **Local File Download**: Streams a file directly from your server's disk (`res.download()` is strictly for local file system paths; for remote URLs, fetch them first and use `res.buffer()` or stream them using `pipeline`).
  ```ts
  await res.download("./path/to/file.pdf", "custom-name.pdf");
  ```

### 2. Cookies & Clearing Cookies

Set and clear cookies with custom options like paths and expiration securely:

```ts
// Setting a cookie
res.cookie({ name: "session", value: "xyz123", httpOnly: true, path: "/" });

// Clearing a cookie
res.clearCookie("session", { path: "/" });
```

### 3. Middleware & Handler Execution Chain

Requestify executes functions in a sequential pipeline order:

1. **Global Middleware** (applied to all routes)
2. **Group Middleware** (applied to prefix groups, e.g., `/api`)
3. **Route Middleware** (applied to specific route definitions)
4. **Route Handler** (the final endpoint logic)

The chain automatically short-circuits if a middleware or handler sends headers (`res.raw.headersSent`), preventing further execution.

### 4. Error Handling & Custom 404s

Handle missing routes or unhandled exceptions cleanly via the configuration object:

```ts
const app = Requestify({
  port: 3000,
  notFound: Handler(({ res }) => {
    res.status(404).json({ error: "Custom 404 Not Found" });
  }),
  errorHandler: ErrorHandler(({ res, error }) => {
    console.error(error);
    res.status(500).text("Internal Server Error");
  }),
});
```
