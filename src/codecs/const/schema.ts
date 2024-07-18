import { JSONSchema } from "json-schema-to-ts";

export const isConstJsonSchema = (schema: JSONSchema): schema is ConstJsonSchema => typeof schema !== "boolean" && "const" in schema;

export interface ConstJsonSchema {
	const: string | number | boolean;
}

export interface ConstParameters {
	type: "const";
	value: string | number | boolean;
}
