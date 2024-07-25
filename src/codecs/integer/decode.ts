import { Binary } from "../../Binary";
import { MAX_32_BIT_INTEGER } from "../../utilities/calculateIntegerBitLength";
import { isNotNullOrUndefined } from "../../utilities/isNotNullOrUndefined";
import { IntegerJsonSchema } from "./schema";

export const decodeInteger = (binary: Binary, schema: IntegerJsonSchema): number => {
	const minimum = schema.minimum ?? (isNotNullOrUndefined(schema.exclusiveMinimum) ? schema.exclusiveMinimum + 1 : Number.MIN_SAFE_INTEGER);
	const maximum = schema.maximum ?? (isNotNullOrUndefined(schema.exclusiveMaximum) ? schema.exclusiveMaximum - 1 : Number.MAX_SAFE_INTEGER);
	const multipleOf = schema.multipleOf || 1;

	const range = Math.min((maximum - minimum) / multipleOf, MAX_32_BIT_INTEGER);

	const bitLength = 32 - Math.clz32(range);
	const byteLength = Math.ceil(bitLength / 8);

	if (byteLength === 1) {
		const byteIndex = binary.readByteIndex;
		const offset = binary.readBitOffset;

		binary.readBitIndex += bitLength;

		if (offset === 0) {
			return binary.buffer[byteIndex] >>> (8 - bitLength);
		} else {
			return ((0xff & (binary.buffer[byteIndex] << offset)) | (binary.buffer[byteIndex + 1] >>> (8 - offset))) >>> (8 - bitLength);
		}
	}

	const normalizedInteger = binary.read((byteLength << 3) - bitLength, byteLength).readUIntBE(0, byteLength);

	return normalizedInteger * (schema?.multipleOf || 1) + (schema?.minimum || 0);
};
