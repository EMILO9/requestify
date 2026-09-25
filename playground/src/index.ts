import Requestify, { ErrorHandler, Handler } from "@emilo/requestify";

const app = Requestify({
  port: 3000,
  routeGroup: {
    "/": {
      routes: [
        {
          path: "/",
          handler: ({ req, res }) => {
            res.text(req);
          },
        },
      ],
    },
  },
});

await app.listen();
