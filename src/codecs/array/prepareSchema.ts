import { prepareIntegerSchema } from "../integer/prepareSchema";
import { MAX_INTEGER } from "../utilities/calculateIntegerBitLength";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { prepareValueSchema } from "../value/prepareSchema";
import { ArrayJsonSchema, ArrayParameters } from "./schema";

export const prepareArraySchema = (schema: ArrayJsonSchema): ArrayParameters => {
	const itemParameters = schema.items ? prepareValueSchema(schema.items) : undefined;
	const tupleParameters = schema.prefixItems?.map((itemSchema) => prepareValueSchema(itemSchema)) || [];

	const minimum = schema.minItems || 0;
	const maximum = schema.maxItems || MAX_INTEGER;

	const length = minimum === maximum ? minimum : undefined;

	const lengthParameters =
		length === undefined
			? prepareIntegerSchema({
					type: "integer",
					minimum,
					maximum,
			  })
			: DEFAULT_LENGTH_PARAMETERS;

	return {
		type: "array",
		itemParameters,
		prefixParameters: tupleParameters,
		length,
		lengthParameters,
	};
};
