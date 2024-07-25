import { Binary } from "../../Binary";
import { isNotNullOrUndefined } from "../../utilities/isNotNullOrUndefined";
import { encodeInteger } from "../integer/encode";
import { EnumJsonSchema } from "./schema";

export const encodeEnum = (enumValue: string | number | boolean, binary: Binary, schema: EnumJsonSchema): void => {
	const index = schema.enum.findIndex((value) => value === enumValue);

	if (!isNotNullOrUndefined(index)) throw new Error("Invalid enum value");

	return encodeInteger(index, binary, {
		type: "integer",
		minimum: 0,
		maximum: schema.enum.length - 1,
	});
};
