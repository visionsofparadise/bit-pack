import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { EnumParameters } from "./schema";

export const decodeEnum = (binary: Binary, parameters: EnumParameters): string | number | boolean => {
	const index = decodeInteger(binary, parameters.lengthParameters);

	const value = parameters.values.at(index);

	if (!value) throw new Error("Invalid enum value");

	return value;
};
