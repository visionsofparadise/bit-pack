import { calculateIntegerBitLength } from "../utilities/calculateIntegerBitLength";
import { EnumJsonSchema, EnumParameters } from "./schema";

export const prepareEnumSchema = (schema: EnumJsonSchema): EnumParameters => {
	const bitLength = calculateIntegerBitLength(schema.enum.length);
	return {
		type: "enum",
		values: schema.enum,
		valueMap: new Map(schema.enum.map((value, index) => [value, index])),
		lengthParameters: {
			type: "integer",
			bitLength,
			byteLength: Math.ceil(bitLength / 8),
			minimum: 0,
			multipleOf: 1,
		},
	};
};
