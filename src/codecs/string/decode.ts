import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { STRING_LENGTH_JSON_SCHEMA, StringJsonSchema } from "./schema";

export const decodeString = (binary: Binary, _: StringJsonSchema): string => {
	const byteLength = decodeInteger(binary, STRING_LENGTH_JSON_SCHEMA);

	return binary.read(0, byteLength).toString("utf8");
};
