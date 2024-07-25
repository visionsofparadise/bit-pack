import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { Base64JsonSchema } from "./schema";

export const encodeBase64 = (base64: string, binary: Binary, schema: Base64JsonSchema): void => {
	const minimum = schema.minLength ?? 0;
	const maximum = schema.maxLength ?? Number.MAX_SAFE_INTEGER;

	if (minimum !== maximum) {
		encodeInteger(base64.length, binary, {
			type: "integer",
			minimum,
			maximum,
		});
	}

	const byteLength = base64.length * (3 / 4);

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(base64, "base64");

	binary.write(binary.writeBuffer, 0, byteLength);
};
