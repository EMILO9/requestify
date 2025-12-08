import type { RequestifyTypes } from "~requestify-types";
import type { ValidationOptions } from "joi";

import * as Joi from "joi";

import { RequestifyError } from "@core/requestifyError";
import { HTTP_METHODS } from "~types/Methods";
import {
	default_error_handler,
	default_handler,
	default_not_found_handler,
} from "@core/defaultHandlers";

const schema = Joi.object<RequestifyTypes.Config>({
	routes: Joi.array()
		.items(
			Joi.object({
				path: Joi.string().trim().default("/"),
				method: Joi.string()
					.trim()
					.valid(...HTTP_METHODS)
					.default("GET"),
				handler: Joi.function().default(() => default_handler),
				middleware: Joi.array().items(Joi.function()).default([]),
			}),
		)
		.default([]),
	global_middleware: Joi.array().items(Joi.function()).default([]),
	error_handler: Joi.function().default(() => default_error_handler),
	not_found_handler: Joi.function().default(() => default_not_found_handler),
	data: Joi.object().unknown(true).default({}),
}).default();

export function Validate(
	input: unknown,
	options?: ValidationOptions,
): RequestifyTypes.Config {
	const { error, value } = schema.validate(input, options);
	if (error) {
		throw new RequestifyError(error.message);
	} else {
		return value;
	}
}
