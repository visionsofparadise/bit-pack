import { prepareIntegerSchema } from "../integer/prepareSchema";
import { prepareStringSchema } from "../string/prepareSchema";
import { MAX_INTEGER } from "../utilities/calculateIntegerBitLength";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { prepareValueSchema } from "../value/prepareSchema";
import { ValueParameters } from "../value/schema";
import { ObjectJsonSchema, ObjectParameters } from "./schema";

export const prepareObjectSchema = (schema: ObjectJsonSchema): ObjectParameters => {
	const propertyParametersEntries = schema.properties ? Object.entries(schema.properties).map(([key, propertySchema]): [string, ValueParameters] => [key, prepareValueSchema(propertySchema)]) : [];

	const evaluatedKeys = new Set(propertyParametersEntries.map(([key]) => key));

	const additionalPropertyParameters = schema.additionalProperties ? prepareValueSchema(schema.additionalProperties) : undefined;

	const keyParameters = schema.propertyNames ? prepareStringSchema(schema.propertyNames) : { type: "string" as const, lengthParameters: DEFAULT_LENGTH_PARAMETERS };

	const minimum = schema.minProperties || 0;
	const maximum = schema.maxProperties || MAX_INTEGER;

	const lengthParameters =
		minimum !== maximum
			? prepareIntegerSchema({
					type: "integer",
					minimum,
					maximum,
			  })
			: DEFAULT_LENGTH_PARAMETERS;

	const length = minimum === maximum ? minimum : undefined;

	return {
		type: "object",
		propertyParametersEntries,
		evaluatedKeys,
		additionalPropertyParameters,
		keyParameters,
		length,
		lengthParameters,
	};
};
