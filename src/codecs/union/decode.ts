import { Binary } from "../../Binary";
import { decodeArray } from "../array/decode";
import { decodeBoolean } from "../boolean/decode";
import { decodeEnum } from "../enum/decode";
import { decodeInteger } from "../integer/decode";
import { decodeNull } from "../null/decode";
import { decodeNumber } from "../number/decode";
import { decodeObject } from "../object/decode";
import { decodeString } from "../string/decode";
import { JSON_SCHEMA_TYPE_ENUM_PARAMETERS, UnionParameters } from "./schema";

export const decodeUnion = (binary: Binary, parameters: UnionParameters): any => {
	const jsonSchemaType = decodeEnum(binary, JSON_SCHEMA_TYPE_ENUM_PARAMETERS);

	switch (jsonSchemaType) {
		case "array":
			if (parameters.parametersMap.array) return decodeArray(binary, parameters.parametersMap.array);
			break;
		case "boolean":
			if (parameters.parametersMap.boolean) return decodeBoolean(binary, parameters.parametersMap.boolean);
			break;
		case "integer":
			if (parameters.parametersMap.integer) return decodeInteger(binary, parameters.parametersMap.integer);
			break;
		case "null":
			if (parameters.parametersMap.null) return decodeNull(binary, parameters.parametersMap.null);
			break;
		case "number":
			if (parameters.parametersMap.number) return decodeNumber(binary, parameters.parametersMap.number);
			break;
		case "object":
			if (parameters.parametersMap.object) return decodeObject(binary, parameters.parametersMap.object);
			break;
		case "string":
			if (parameters.parametersMap.string) return decodeString(binary, parameters.parametersMap.string);
			break;
	}
};
