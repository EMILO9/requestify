import { Requestify } from "@emilo/requestify";

Requestify({
  "/": [
    [],
    [{ path: "/a", methods: ["GET"], middleware: [], handler: () => {} }],
  ],
});
