import { mergeSchemas } from "@fastify/merge-json-schemas";
import { JSONSchema } from "json-schema-to-ts";
import { prepareAnySchema } from "../any/prepareSchema";
import { isAnyJsonSchema } from "../any/schema";
import { prepareArraySchema } from "../array/prepareSchema";
import { isArrayJsonSchema } from "../array/schema";
import { prepareBooleanSchema } from "../boolean/prepareSchema";
import { isBooleanJsonSchema } from "../boolean/schema";
import { prepareConstSchema } from "../const/prepareSchema";
import { isConstJsonSchema } from "../const/schema";
import { prepareEnumSchema } from "../enum/prepareSchema";
import { isEnumJsonSchema } from "../enum/schema";
import { prepareIntegerSchema } from "../integer/prepareSchema";
import { isIntegerJsonSchema } from "../integer/schema";
import { prepareNullSchema } from "../null/prepareSchema";
import { isNullJsonSchema } from "../null/schema";
import { prepareNumberSchema } from "../number/prepareSchema";
import { isNumberJsonSchema } from "../number/schema";
import { prepareObjectSchema } from "../object/prepareSchema";
import { isObjectJsonSchema } from "../object/schema";
import { prepareStringSchema } from "../string/prepareSchema";
import { isStringJsonSchema } from "../string/schema";
import { prepareUnionSchema } from "../union/prepareSchema";
import { isUnionJsonSchema } from "../union/schema";
import { ValueParameters } from "./schema";

export const prepareValueSchema = (schema: JSONSchema): ValueParameters => {
	if (isAnyJsonSchema(schema)) return prepareAnySchema(schema);
	if (typeof schema === "boolean") throw new Error("Invalid schema");

	const mergedSchema: Exclude<JSONSchema, boolean> = schema.allOf ? mergeSchemas([schema, ...schema.allOf]) : schema;

	if (isArrayJsonSchema(mergedSchema)) return prepareArraySchema(mergedSchema);
	if (isBooleanJsonSchema(mergedSchema)) return prepareBooleanSchema(mergedSchema);
	if (isConstJsonSchema(mergedSchema)) return prepareConstSchema(mergedSchema);
	if (isEnumJsonSchema(mergedSchema)) return prepareEnumSchema(mergedSchema);
	if (isIntegerJsonSchema(mergedSchema)) return prepareIntegerSchema(mergedSchema);
	if (isNullJsonSchema(mergedSchema)) return prepareNullSchema(mergedSchema);
	if (isNumberJsonSchema(mergedSchema)) return prepareNumberSchema(mergedSchema);
	if (isObjectJsonSchema(mergedSchema)) return prepareObjectSchema(mergedSchema);
	if (isStringJsonSchema(mergedSchema)) return prepareStringSchema(mergedSchema);
	if (isUnionJsonSchema(mergedSchema)) return prepareUnionSchema(mergedSchema);

	throw new Error("Invalid schema");
};
