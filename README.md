# Requestify

![NPM Version](https://img.shields.io/npm/v/%40emilo%2Frequestify?style=flat-square&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40emilo%2Frequestify)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)
![NPM License](https://img.shields.io/npm/l/%40emilo%2Frequestify?style=flat-square)

```bash
npm i @emilo/requestify
```

```javascript
import { Requestify, type RequestifyTypes } from "@emilo/requestify";

(async () =>
	Requestify({
		routes: [
			{
				path: "/",
				method: "GET",
				handler: async ({ req, res }) => {
					res.status(200).json({
						url: req.url,
						method: req.method,
					});
				},
				middleware: [
					() =>
						new Promise((resolve) =>
							setTimeout(() => resolve(true), 2000),
						),
				],
			},
		],
	}))()
	.then((app) => app.listen(3000))
	.catch((error) => console.error(error));
```
