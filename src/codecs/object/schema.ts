import { StringJsonSchema } from "../string/schema";
import { ValueJsonSchema } from "../value/schema";

export interface ObjectJsonSchema {
	type: "object";
	properties?: Record<string, ValueJsonSchema>;
	patternProperties?: Record<string, ValueJsonSchema>;
	additionalProperties?: ValueJsonSchema;
	unevaluatedProperties?: ValueJsonSchema;
	propertyNames?: StringJsonSchema;
	minProperties?: number;
	maxProperties?: number;
}
