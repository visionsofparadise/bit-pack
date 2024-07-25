import { Binary } from "../../Binary";
import { MAX_32_BIT_INTEGER } from "../../utilities/calculateIntegerBitLength";
import { isNotNullOrUndefined } from "../../utilities/isNotNullOrUndefined";
import { zeroRightBits } from "../../utilities/zeroBits";
import { IntegerJsonSchema } from "./schema";

export const encodeInteger = (integer: number, binary: Binary, schema: IntegerJsonSchema): void => {
	const minimum = schema.minimum ?? (isNotNullOrUndefined(schema.exclusiveMinimum) ? schema.exclusiveMinimum + 1 : Number.MIN_SAFE_INTEGER);
	const maximum = schema.maximum ?? (isNotNullOrUndefined(schema.exclusiveMaximum) ? schema.exclusiveMaximum - 1 : Number.MAX_SAFE_INTEGER);
	const multipleOf = schema.multipleOf || 1;

	const range = Math.min((maximum - minimum) / multipleOf, MAX_32_BIT_INTEGER);

	const bitLength = 32 - Math.clz32(range);
	const byteLength = Math.ceil(bitLength / 8);

	const normalizedInteger = (integer - (schema.minimum || 0)) / (schema?.multipleOf || 1);

	if (byteLength === 1) {
		const byteIndex = binary.writeByteIndex;

		binary.reallocateBuffer(1);

		const sourceOffset = 8 - bitLength;
		const targetOffset = binary.writeBitOffset;

		binary.writeBitIndex += bitLength;

		if (sourceOffset === 0 && targetOffset === 0) {
			binary.buffer[byteIndex] = normalizedInteger;
		}

		if (targetOffset === 0) {
			binary.buffer[byteIndex] = normalizedInteger << sourceOffset;

			return;
		}

		binary.buffer[byteIndex] = zeroRightBits(binary.buffer[byteIndex], 8 - targetOffset);

		if (sourceOffset === targetOffset) {
			binary.buffer[byteIndex] |= normalizedInteger;

			return;
		}

		if (sourceOffset > targetOffset) {
			binary.buffer[byteIndex] |= normalizedInteger << (sourceOffset - targetOffset);

			return;
		}

		if (sourceOffset < targetOffset) {
			binary.buffer[byteIndex] |= normalizedInteger >>> (targetOffset - sourceOffset);
			binary.buffer[byteIndex + 1] = 0xff & (normalizedInteger << (8 - (targetOffset - sourceOffset)));

			return;
		}
	}

	binary.writeBuffer.writeUIntBE(normalizedInteger, 0, byteLength);

	binary.write(binary.writeBuffer, (byteLength << 3) - bitLength, byteLength);
};
