import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { STRING_LENGTH_PARAMETERS, StringParameters } from "./schema";

export const decodeString = (binary: Binary, _: StringParameters): string => {
	const byteLength = decodeInteger(binary, STRING_LENGTH_PARAMETERS);

	return binary.read(0, byteLength).toString("utf8");
};
