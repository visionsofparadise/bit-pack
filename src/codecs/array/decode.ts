import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { decodeValue } from "../value/decode";
import { ArrayJsonSchema } from "./schema";

export const decodeArray = (binary: Binary, schema: ArrayJsonSchema): Array<any> => {
	const array: Array<any> = [];

	if (schema.prefixItems) schema.prefixItems.forEach((itemSchema) => array.push(decodeValue(binary, itemSchema)));

	if (!schema.items) return array;

	const minimum = schema.minItems ?? 0;
	const maximum = schema.maxItems ?? Number.MAX_SAFE_INTEGER;

	const length =
		minimum === maximum
			? minimum
			: decodeInteger(binary, {
					type: "integer",
					minimum,
					maximum,
			  });

	for (let i = 0; i < length; i++) array.push(decodeValue(binary, schema.items));

	return array;
};
