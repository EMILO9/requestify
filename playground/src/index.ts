import Requestify from "@emilo/requestify";

const app = Requestify({
  global_middleware: [],
  error_handler: ({ req, res, error }) => {
    res.raw.end(error);
  },
  groups: {
    "/api": {
      group_middleware: [],
      routes: [
        {
          path: "/",
          methods: ["GET"],
          middleware: [],
          handler: async ({ req, res }) => {
            throw new Error("An error occured!");
            res.raw.end("Hello from Piko!");
          },
        },
      ],
    },
  },
}).listen(3000);
