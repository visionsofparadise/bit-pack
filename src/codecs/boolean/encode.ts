import { Binary } from "../../Binary";
import { BooleanJsonSchema } from "./schema";

export const encodeBoolean = (boolean: boolean, binary: Binary, _: BooleanJsonSchema): void => {
	binary.reallocateBuffer(1);

	if (boolean) {
		binary.buffer[binary.writeBitIndex >>> 3] |= 0x80 >>> binary.writeBitIndex % 8;
	} else {
		binary.buffer[binary.writeBitIndex >>> 3] &= ~(0x80 >>> binary.writeBitIndex % 8);
	}

	binary.writeBitIndex += 1;
};
