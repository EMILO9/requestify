# Requestify

![NPM Version](https://img.shields.io/npm/v/%40emilo%2Frequestify?style=flat-square&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40emilo%2Frequestify)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)
![NPM License](https://img.shields.io/npm/l/%40emilo%2Frequestify?style=flat-square)

```bash
npm i @emilo/requestify
```

```javascript
import { MongoClient } from "mongodb";
import { Requestify } from "@emilo/requestify";

(async () => {
	const isDev = process.env.NODE_ENV !== "production";
	const mongodb = new MongoClient("_fake_mongo_url_");
	await mongodb.connect();
	const db = mongodb.db("my-db");
	const app = Requestify({
		data: { db, b: 1 },
		global_middleware: [
			async ({ req, res, data, params, errorHandler }) => {},
			...(isDev ? [() => true] : []),
		],
		routes: [
			{
				path: "/",
				method: "GET",
				handler: ({ req, res, data, params, errorHandler }) => {},
				middleware: [],
			},
		],
		error_handler: async ({ req, res, data, error }) => {},
		not_found_handler: async ({ req, res, data, errorHandler }) => {},
	});
	return app;
})()
	.then((app) => app.listen(3000))
	.catch((error) => {
		console.error("Failed to start application:", error);
		process.exit(1);
	});
```
