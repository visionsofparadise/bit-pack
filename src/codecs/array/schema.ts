import { ValueJsonSchema } from "../value/schema";

export interface ArrayJsonSchema {
	type: "array";
	items?: ValueJsonSchema;
	prefixItems?: Array<ValueJsonSchema>;
	minItems?: number;
	maxItems?: number;
}
