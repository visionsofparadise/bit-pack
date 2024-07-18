import { JSONSchema } from "json-schema-to-ts";
import { IntegerParameters } from "../integer/schema";

export const isEnumJsonSchema = (schema: JSONSchema): schema is EnumJsonSchema => typeof schema !== "boolean" && "enum" in schema;

export interface EnumJsonSchema {
	enum: Array<string | number | boolean>;
}

export interface EnumParameters {
	type: "enum";
	values: Array<string | number | boolean>;
	valueMap: Map<string | number | boolean, number>;
	lengthParameters: IntegerParameters;
}
