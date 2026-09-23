import Requestify from "@emilo/requestify";

const app = Requestify({
  namespaces: {
    "/": {
      middleware: [],
      routes: [
        {
          path: "/",
          methods: ["GET"],
          handler: ({ req, res }) => {
            throw new Error("Some error!");
            res.status(200).json({
              path: req.path,
              params: req.params,
              query: req.query,
              cookies: req.cookies,
            });
          },
        },
      ],
    },
  },
});

app.listen(8080);
