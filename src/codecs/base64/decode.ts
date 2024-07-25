import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { Base64JsonSchema } from "./schema";

export const decodeBase64 = (binary: Binary, schema: Base64JsonSchema): string => {
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

	return binary.read(0, length * (3 / 4)).toString("base64");
};
