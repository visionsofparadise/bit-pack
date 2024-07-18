import { JSONSchema } from "json-schema-to-ts";
import { IntegerParameters } from "../integer/schema";
import { StringJsonSchema, StringParameters, StringTypeParameters } from "../string/schema";
import { ValueParameters } from "../value/schema";

export const isObjectJsonSchema = (schema: JSONSchema): schema is ObjectJsonSchema => typeof schema !== "boolean" && schema.type === "object";

export interface ObjectJsonSchema {
	type: "object";
	properties?: Record<string, JSONSchema>;
	patternProperties?: Record<string, JSONSchema>;
	additionalProperties?: JSONSchema;
	unevaluatedProperties?: JSONSchema;
	propertyNames?: StringJsonSchema;
	minProperties?: number;
	maxProperties?: number;
}

export interface ObjectParameters {
	type: "object";
	propertyParametersEntries: Array<[string, ValueParameters]>;
	evaluatedKeys: Set<string>;
	additionalPropertyParameters?: ValueParameters;
	keyParameters: StringParameters | StringTypeParameters;
	length?: number;
	lengthParameters: IntegerParameters;
}
