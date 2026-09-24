# Requestify

A minimalist, unopinionated TypeScript HTTP router built for production. Requestify provides a lightning-fast, lightweight core leveraging explicit interfaces and TypeScript module augmentation for total extensibility without framework bloat.

## Features

* **Zero Bloat Core:** Built directly on top of Node.js native `http` server primitives.
* **Dual ESM/CJS Support:** Seamlessly packaged and verified.
* **Configuration-First Routing:** Clean, tree-based namespace and route configuration.
* **Type-Safe Extensibility:** Designed for user-land middleware expansion via global module augmentation.

## Quick Start

```ts
import Requestify from "@emilo/requestify";

const app = Requestify({
  namespaces: {
    "/": {
      routes: [
        {
          path: "/:slug",
          methods: ["GET"],
          handler: ({ req, res }) => res.status(200).send(`Slug: ${req.params.slug}`),
        },
      ],
    },
  },
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
```