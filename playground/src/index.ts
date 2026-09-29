import Requestify, {
  Handler,
  ErrorHandler,
  json,
  raw,
  text,
  urlencoded,
  multipart,
} from "@emilo/requestify";

const app = Requestify({
  errorHandler: ErrorHandler(({ req, res, error }) => {
    console.log(error);
    res.status(200).json({
      path: req.url,
      method: req.method,
      error,
    });
  }),
  routeGroup: {
    "/": {
      routes: [
        {
          methods: ["GET"],
          middleware: [],
          handler: Handler(async ({ req, res }) => {}),
        },
      ],
    },
  },
});

await app.listen();
console.log(`App started on PORT: ${app.port}`);
