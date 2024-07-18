import { Binary } from "../../../../Binary";
import { encodeInteger } from "../../../integer/encode";
import { HexParameters } from "./schema";

export const encodeHex = (hex: string, binary: Binary, parameters: HexParameters): void => {
	parameters.length ?? encodeInteger(hex.length, binary, parameters.lengthParameters);

	const byteLength = hex.length / 2;

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(hex, "hex");

	binary.write(binary.writeBuffer, 0, byteLength);
};
