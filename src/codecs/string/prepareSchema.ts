import { prepareIntegerSchema } from "../integer/prepareSchema";
import { MAX_INTEGER } from "../utilities/calculateIntegerBitLength";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { Base64Parameters } from "./contentEncoding/base64/schema";
import { HexParameters } from "./contentEncoding/hex/schema";
import { DateParameters } from "./format/date/schema";
import { DateTimeParameters } from "./format/dateTime/schema";
import { Ipv4Parameters } from "./format/ipv4/schema";
import { TimeParameters } from "./format/time/schema";
import { UuidParameters } from "./format/uuid/schema";
import { StringJsonSchema, StringParameters } from "./schema";

export const prepareStringSchema = (
	schema: StringJsonSchema
): StringParameters | Base64Parameters | HexParameters | DateParameters | DateTimeParameters | Ipv4Parameters | TimeParameters | UuidParameters => {
	const minimum = schema.minLength || 0;
	const maximum = schema.maxLength || MAX_INTEGER;

	const lengthParameters =
		minimum !== maximum
			? prepareIntegerSchema({
					type: "integer",
					minimum,
					maximum,
			  })
			: DEFAULT_LENGTH_PARAMETERS;

	const length = minimum === maximum ? minimum : undefined;

	switch (schema.contentEncoding) {
		case "base64":
			return {
				type: "base64",
				lengthParameters,
				length,
			};
		case "base16":
			return {
				type: "hex",
				lengthParameters,
				length,
			};
	}

	switch (schema.format) {
		case "date":
			return {
				type: "date",
			};
		case "date-time":
			return {
				type: "dateTime",
			};
		case "ipv4":
			return {
				type: "ipv4",
			};
		case "time":
			return {
				type: "time",
			};
		case "uuid":
			return {
				type: "uuid",
			};
	}

	return {
		type: "string",
		lengthParameters,
		length,
	};
};
