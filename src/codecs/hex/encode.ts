import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { HexJsonSchema } from "./schema";

export const encodeHex = (hex: string, binary: Binary, schema: HexJsonSchema): void => {
	const minimum = schema.minLength ?? 0;
	const maximum = schema.maxLength ?? Number.MAX_SAFE_INTEGER;

	if (minimum !== maximum) {
		encodeInteger(hex.length, binary, {
			type: "integer",
			minimum,
			maximum,
		});
	}

	const byteLength = hex.length / 2;

	binary.reallocateBuffer(byteLength);

	binary.writeBuffer.write(hex, "hex");

	binary.write(binary.writeBuffer, 0, byteLength);
};
