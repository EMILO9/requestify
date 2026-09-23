import Requestify from "@emilo/requestify";

const app = Requestify({
  namespaces: {
    "/": {
      routes: [
        {
          path: "/:slug",
          methods: ["GET"],
          handler: ({ req, res }) => res.status(200).send(req.path),
        },
        {
          path: "/{*splat}",
          methods: ["GET"],
          handler: ({ req, res }) => res.status(200).send("*"),
        },
      ],
    },
  },
});

app.listen(8080);
