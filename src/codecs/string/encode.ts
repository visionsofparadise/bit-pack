import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { StringParameters } from "./schema";

export const encodeString = (string: string, binary: Binary, parameters: StringParameters): void => {
	const byteLength = Buffer.byteLength(string, "utf8");

	parameters.length ?? encodeInteger(byteLength, binary, parameters.lengthParameters || { type: "integer", bitLength: 32, byteLength: 4, minimum: 0, multipleOf: 1 });

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(string, 0, "utf8");

	binary.write(binary.writeBuffer, 0, byteLength);
};
