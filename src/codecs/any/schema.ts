import { JSONSchema } from "json-schema-to-ts";

export const isAnyJsonSchema = (schema: JSONSchema): schema is AnyJsonSchema => typeof schema === "boolean" && schema === true;

export type AnyJsonSchema = boolean;

export interface AnyParameters {
	type: "any";
}
