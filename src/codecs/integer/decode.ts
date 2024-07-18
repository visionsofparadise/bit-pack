import { Binary } from "../../Binary";
import { IntegerParameters } from "./schema";

export const decodeInteger = (binary: Binary, parameters: IntegerParameters): number => {
	if (parameters.byteLength === 1) {
		const byteIndex = binary.readByteIndex;
		const offset = binary.readBitOffset;

		binary.readBitIndex += parameters.bitLength;

		if (offset === 0) {
			return binary.buffer[byteIndex] >>> (8 - parameters.bitLength);
		} else {
			return ((0xff & (binary.buffer[byteIndex] << offset)) | (binary.buffer[byteIndex + 1] >>> (8 - offset))) >>> (8 - parameters.bitLength);
		}
	}

	const normalizedInteger = binary.read((parameters.byteLength << 3) - parameters.bitLength, parameters.byteLength).readUIntBE(0, parameters.byteLength);

	return normalizedInteger * (parameters?.multipleOf || 1) + (parameters?.minimum || 0);
};
