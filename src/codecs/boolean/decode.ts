import { Binary } from "../../Binary";
import { BooleanJsonSchema } from "./schema";

export const decodeBoolean = (binary: Binary, _: BooleanJsonSchema): boolean => {
	const boolean = (binary.buffer[binary.readBitIndex >>> 3] & (0x80 >>> binary.readBitIndex % 8)) !== 0;

	binary.readBitIndex += 1;

	return boolean;
};
