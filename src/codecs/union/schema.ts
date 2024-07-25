import { ArrayJsonSchema } from "../array/schema";
import { BooleanJsonSchema } from "../boolean/schema";
import { EnumJsonSchema } from "../enum/schema";
import { IntegerJsonSchema } from "../integer/schema";
import { NullJsonSchema } from "../null/schema";
import { NumberJsonSchema } from "../number/schema";
import { ObjectJsonSchema } from "../object/schema";
import { StringJsonSchema } from "../string/schema";

export const JSON_SCHEMA_TYPE = ["array", "boolean", "integer", "null", "number", "object", "string"];

export type JsonSchemaType = (typeof JSON_SCHEMA_TYPE)[number];

export type UnionJsonSchema =
	| ({
			type: Array<JsonSchemaType>;
	  } & Omit<ArrayJsonSchema, "type">)
	| Omit<BooleanJsonSchema, "type">
	| Omit<IntegerJsonSchema, "type">
	| Omit<NullJsonSchema, "type">
	| Omit<NumberJsonSchema, "type">
	| Omit<ObjectJsonSchema, "type">
	| Omit<StringJsonSchema, "type">;

export const JSON_SCHEMA_TYPE_ENUM_SCHEMA: EnumJsonSchema = {
	enum: JSON_SCHEMA_TYPE,
};
