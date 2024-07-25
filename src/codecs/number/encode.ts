import { Binary } from "../../Binary";
import { NumberJsonSchema } from "./schema";

export const encodeNumber = (number: number, binary: Binary, _: NumberJsonSchema): void => {
	binary.writeBuffer.writeDoubleBE(number, 0);

	binary.write(binary.writeBuffer, 0, 8);
};
