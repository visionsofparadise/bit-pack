import { MAX_32_BIT_INTEGER } from "../../utilities/calculateIntegerBitLength";
import { IntegerJsonSchema } from "../integer/schema";

export interface StringJsonSchema {
	type: "string";
	contentEncoding?: "base32";
	minLength?: number;
	maxLength?: number;
}

export const STRING_LENGTH_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: MAX_32_BIT_INTEGER,
	multipleOf: 1,
};
