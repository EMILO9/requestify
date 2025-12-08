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
