import { JSONSchema } from "json-schema-to-ts";

export const isNumberJsonSchema = (schema: JSONSchema): schema is NumberJsonSchema => typeof schema !== "boolean" && schema.type === "number";

export interface NumberJsonSchema {
	type: "number";
}

export interface NumberParameters {
	type: "number";
}
