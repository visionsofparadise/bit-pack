import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { EnumJsonSchema } from "./schema";

export const decodeEnum = (binary: Binary, schema: EnumJsonSchema): string | number | boolean => {
	const index = decodeInteger(binary, {
		type: "integer",
		minimum: 0,
		maximum: schema.enum.length - 1,
	});

	const value = schema.enum.at(index);

	if (!value) throw new Error("Invalid enum value");

	return value;
};
