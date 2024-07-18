import { Binary } from "../../Binary";
import { encodeArray } from "../array/encode";
import { encodeBoolean } from "../boolean/encode";
import { encodeEnum } from "../enum/encode";
import { encodeInteger } from "../integer/encode";
import { encodeNull } from "../null/encode";
import { encodeNumber } from "../number/encode";
import { encodeObject } from "../object/encode";
import { encodeString } from "../string/encode";
import { JSON_SCHEMA_TYPE_ENUM_PARAMETERS, UnionParameters } from "./schema";

export const encodeUnion = (union: any, binary: Binary, parameters: UnionParameters): void => {
	const jsonSchemaType = Array.isArray(union)
		? "array"
		: union === null
		? "null"
		: typeof union === "boolean"
		? "boolean"
		: typeof union === "number" && Number.isInteger(union)
		? "integer"
		: typeof union === "number"
		? "number"
		: typeof union === "object"
		? "object"
		: typeof union === "string"
		? "string"
		: undefined;

	if (!jsonSchemaType) throw new Error("Invalid union value");

	encodeEnum(jsonSchemaType, binary, JSON_SCHEMA_TYPE_ENUM_PARAMETERS);

	switch (jsonSchemaType) {
		case "array":
			if (parameters.parametersMap.array) return encodeArray(union, binary, parameters.parametersMap.array);
			break;
		case "boolean":
			if (parameters.parametersMap.boolean) return encodeBoolean(union, binary, parameters.parametersMap.boolean);
			break;
		case "integer":
			if (parameters.parametersMap.integer) return encodeInteger(union, binary, parameters.parametersMap.integer);
			break;
		case "null":
			if (parameters.parametersMap.null) return encodeNull(union, binary, parameters.parametersMap.null);
			break;
		case "number":
			if (parameters.parametersMap.number) return encodeNumber(union, binary, parameters.parametersMap.number);
			break;
		case "object":
			if (parameters.parametersMap.object) return encodeObject(union, binary, parameters.parametersMap.object);
			break;
		case "string":
			if (parameters.parametersMap.string) return encodeString(union, binary, parameters.parametersMap.string);
			break;
	}
};
