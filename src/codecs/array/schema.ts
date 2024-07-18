import { JSONSchema } from "json-schema-to-ts";
import { IntegerParameters } from "../integer/schema";
import { ValueParameters } from "../value/schema";

export const isArrayJsonSchema = (schema: JSONSchema): schema is ArrayJsonSchema => typeof schema !== "boolean" && schema.type === "array";

export interface ArrayJsonSchema {
	type: "array";
	items?: JSONSchema;
	prefixItems?: Array<JSONSchema>;
	minItems?: number;
	maxItems?: number;
}

export interface ArrayParameters {
	type: "array";
	prefixParameters: Array<ValueParameters>;
	itemParameters?: ValueParameters;
	length?: number;
	lengthParameters: IntegerParameters;
}
