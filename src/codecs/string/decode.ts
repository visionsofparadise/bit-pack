import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { StringParameters } from "./schema";

export const decodeString = (binary: Binary, parameters: StringParameters): string => {
	const byteLength = parameters.length ?? decodeInteger(binary, parameters.lengthParameters);

	return binary.read(0, byteLength).toString("utf8");
};
