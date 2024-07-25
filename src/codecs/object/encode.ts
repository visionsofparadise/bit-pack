import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { encodeValue } from "../value/encode";
import { ObjectJsonSchema } from "./schema";

export const encodeObject = (object: Record<string, any>, binary: Binary, schema: ObjectJsonSchema): void => {
	if (schema.properties) {
		Object.entries(schema.properties).forEach((parametersEntry, i) => {
			encodeInteger(i, binary, {
				type: "integer",
				minimum: 0,
				maximum: i || 1,
				multipleOf: 1,
			});

			const [key, valueParameters] = parametersEntry;

			const value = object[key];

			if (value === undefined) return;

			encodeValue(value, binary, valueParameters);
		});
	}

	if (!schema.additionalProperties) return;

	const restEntries = Object.entries(object).filter(([key]) => !schema.properties || !schema.properties[key]);

	if (restEntries.length === 0) return;

	const minimum = schema.minProperties ?? 0;
	const maximum = schema.maxProperties ?? Number.MAX_SAFE_INTEGER;

	if (minimum !== maximum) {
		encodeInteger(restEntries.length, binary, {
			type: "integer",
			minimum,
			maximum,
		});
	}

	for (const [key, value] of restEntries) {
		encodeValue(key, binary, schema.propertyNames || { type: "string" });
		encodeValue(value, binary, schema.additionalProperties);
	}
};
