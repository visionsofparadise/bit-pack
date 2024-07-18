import { JSONSchema } from "json-schema-to-ts";

export const isBooleanJsonSchema = (schema: JSONSchema): schema is BooleanJsonSchema => typeof schema !== "boolean" && schema.type === "boolean";

export interface BooleanJsonSchema {
	type: "boolean";
}

export interface BooleanParameters {
	type: "boolean";
}
