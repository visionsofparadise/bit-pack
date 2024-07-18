import { JSONSchema } from "json-schema-to-ts";

export const isNullJsonSchema = (schema: JSONSchema): schema is NullJsonSchema => typeof schema !== "boolean" && schema.type === "null";

export interface NullJsonSchema {
	type: "null";
}

export interface NullParameters {
	type: "null";
}
