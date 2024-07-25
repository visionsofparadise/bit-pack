import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { decodeValue } from "../value/decode";
import { ObjectJsonSchema } from "./schema";

export const decodeObject = (binary: Binary, schema: ObjectJsonSchema): Record<string, any> => {
	const object: Record<string, any> = {};
	let currentLength = 0;

	if (schema.properties) {
		Object.entries(schema.properties).forEach((parametersEntry, i) => {
			const index = decodeInteger(binary, {
				type: "integer",
				minimum: 0,
				maximum: i || 1,
				multipleOf: 1,
			});

			if (index !== i) return;

			const [key, valueParameters] = parametersEntry;

			const value = decodeValue(binary, valueParameters);

			object[key] = value;
			currentLength += 1;
		});
	}

	if (!schema.additionalProperties) return object;

	const minimum = schema.minProperties ?? 0;
	const maximum = schema.maxProperties ?? Number.MAX_SAFE_INTEGER;

	const length =
		minimum === maximum
			? minimum
			: decodeInteger(binary, {
					type: "integer",
					minimum,
					maximum,
			  });

	for (let i = 0; i < length; i++) {
		const key = decodeValue(binary, schema.propertyNames || { type: "string" });
		const value = decodeValue(binary, schema.additionalProperties);

		object[key] = value;
	}

	return object;
};
