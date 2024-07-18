import { JSONSchema } from "json-schema-to-ts";

export const isIntegerJsonSchema = (schema: JSONSchema): schema is IntegerJsonSchema => typeof schema !== "boolean" && schema.type === "integer";

export interface IntegerJsonSchema {
	type: "integer";
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	multipleOf?: number;
}

export interface IntegerParameters {
	type: "integer";
	bitLength: number;
	byteLength: number;
	minimum: number;
	multipleOf: number;
}
