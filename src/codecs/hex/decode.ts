import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { HexJsonSchema } from "./schema";

export const decodeHex = (binary: Binary, schema: HexJsonSchema): string => {
	const minimum = schema.minLength ?? 0;
	const maximum = schema.maxLength ?? Number.MAX_SAFE_INTEGER;

	const length =
		minimum === maximum
			? minimum
			: decodeInteger(binary, {
					type: "integer",
					minimum,
					maximum,
			  });

	return binary.read(0, length / 2).toString("hex");
};
