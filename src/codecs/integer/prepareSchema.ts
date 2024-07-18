import { MAX_INTEGER } from "../utilities/calculateIntegerBitLength";
import { isNotNullOrUndefined } from "../utilities/isNotNullOrUndefined";
import { IntegerJsonSchema, IntegerParameters } from "./schema";

export const prepareIntegerSchema = (schema: IntegerJsonSchema): IntegerParameters => {
	const minimum = isNotNullOrUndefined(schema.minimum) ? schema.minimum : isNotNullOrUndefined(schema.exclusiveMinimum) ? schema.exclusiveMinimum + 1 : Number.MIN_SAFE_INTEGER;
	const maximum = isNotNullOrUndefined(schema.maximum) ? schema.maximum : isNotNullOrUndefined(schema.exclusiveMaximum) ? schema.exclusiveMaximum - 1 : Number.MAX_SAFE_INTEGER;
	const multipleOf = schema.multipleOf || 1;

	const range = Math.min((maximum - minimum) / multipleOf, MAX_INTEGER);

	const bitLength = 32 - Math.clz32(range);
	const byteLength = Math.ceil(bitLength / 8);

	return {
		type: "integer",
		bitLength,
		byteLength,
		minimum,
		multipleOf,
	};
};
