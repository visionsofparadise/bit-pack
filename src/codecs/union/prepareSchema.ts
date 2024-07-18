import { prepareArraySchema } from "../array/prepareSchema";
import { prepareBooleanSchema } from "../boolean/prepareSchema";
import { prepareIntegerSchema } from "../integer/prepareSchema";
import { prepareNullSchema } from "../null/prepareSchema";
import { prepareNumberSchema } from "../number/prepareSchema";
import { prepareObjectSchema } from "../object/prepareSchema";
import { prepareStringSchema } from "../string/prepareSchema";
import { UnionJsonSchema, UnionParameters } from "./schema";

export const prepareUnionSchema = (schema: UnionJsonSchema): UnionParameters => {
	return {
		type: "union",
		parametersMap: Object.fromEntries(
			schema.type.map((type) => {
				switch (type) {
					case "array":
						return [type, prepareArraySchema({ ...schema, type: "array" })];
					case "boolean":
						return [type, prepareBooleanSchema({ ...schema, type: "boolean" })];
					case "integer":
						return [type, prepareIntegerSchema({ ...schema, type: "integer" })];
					case "null":
						return [type, prepareNullSchema({ ...schema, type: "null" })];
					case "number":
						return [type, prepareNumberSchema({ ...schema, type: "number" })];
					case "object":
						return [type, prepareObjectSchema({ ...schema, type: "object" })];
					case "string":
						return [type, prepareStringSchema({ ...schema, type: "string" })];
				}
			})
		),
	};
};
