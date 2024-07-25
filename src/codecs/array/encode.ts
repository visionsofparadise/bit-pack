import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { encodeValue } from "../value/encode";
import { ArrayJsonSchema } from "./schema";

export const encodeArray = (array: Array<any>, binary: Binary, schema: ArrayJsonSchema): void => {
	if (schema.prefixItems) schema.prefixItems.forEach((itemSchema, i) => encodeValue(array.at(i), binary, itemSchema));

	if (!schema.items) return;

	const minimum = schema.minItems ?? 0;
	const maximum = schema.maxItems ?? Number.MAX_SAFE_INTEGER;

	if (minimum !== maximum) {
		encodeInteger(array.length - (schema.prefixItems?.length || 0), binary, {
			type: "integer",
			minimum,
			maximum,
		});
	}

	for (let i = schema.prefixItems?.length || 0; i < array.length; i++) encodeValue(array[i], binary, schema.items);
};
