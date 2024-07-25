import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { STRING_LENGTH_JSON_SCHEMA, StringJsonSchema } from "./schema";

export const encodeString = (string: string, binary: Binary, _: StringJsonSchema): void => {
	const byteLength = Buffer.byteLength(string, "utf8");

	encodeInteger(byteLength, binary, STRING_LENGTH_JSON_SCHEMA);

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(string, 0, "utf8");

	binary.write(binary.writeBuffer, 0, byteLength);
};
