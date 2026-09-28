import Requestify, { ErrorHandler, Handler, json } from "@emilo/requestify";

const app = Requestify({
  port: 3000,
  globalMiddleware: [json()],
  routeGroup: {
    "/": {
      routes: [
        {
          path: "/",
          handler: Handler(({ req, res }) => {
            res.json(req.body);
          }),
        },
      ],
    },
  },
  errorHandler: ErrorHandler(({ req, res, error }) => {
    res.json({ message: error.message });
  }),
});

await app.listen();
console.log(`App started on PORT: ${app.port}`);
