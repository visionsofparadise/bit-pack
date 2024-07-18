import { Binary } from "../../Binary";
import { NumberParameters } from "./schema";

export const encodeNumber = (number: number, binary: Binary, _: NumberParameters): void => {
	binary.writeBuffer.writeDoubleBE(number, 0);

	binary.write(binary.writeBuffer, 0, 8);
};
