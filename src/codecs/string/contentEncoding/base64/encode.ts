import { Binary } from "../../../../Binary";
import { encodeInteger } from "../../../integer/encode";
import { Base64Parameters } from "./schema";

export const encodeBase64 = (base64: string, binary: Binary, parameters: Base64Parameters): void => {
	parameters.length ?? encodeInteger(base64.length, binary, parameters.lengthParameters);

	const byteLength = base64.length * (3 / 4);

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(base64, "base64");

	binary.write(binary.writeBuffer, 0, byteLength);
};
