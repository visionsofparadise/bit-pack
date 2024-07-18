import { Binary } from "../../Binary";
import { zeroRightBits } from "../utilities/zeroBits";
import { IntegerParameters } from "./schema";

export const encodeInteger = (integer: number, binary: Binary, parameters: IntegerParameters): void => {
	const normalizedInteger = (integer - (parameters.minimum || 0)) / (parameters?.multipleOf || 1);

	if (parameters.byteLength === 1) {
		const byteIndex = binary.writeByteIndex;

		binary.reallocateBuffer(1);

		const sourceOffset = 8 - parameters.bitLength;
		const targetOffset = binary.writeBitOffset;

		binary.writeBitIndex += parameters.bitLength;

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

	binary.writeBuffer.writeUIntBE(normalizedInteger, 0, parameters.byteLength);

	binary.write(binary.writeBuffer, (parameters.byteLength << 3) - parameters.bitLength, parameters.byteLength);
};
