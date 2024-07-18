import { Binary } from "../../Binary";
import { NumberParameters } from "./schema";

export const decodeNumber = (binary: Binary, __: NumberParameters): number => {
	const buffer = binary.read(0, 8);

	return buffer.readDoubleBE(0);
};
