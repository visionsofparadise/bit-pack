import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { isNotNullOrUndefined } from "../utilities/isNotNullOrUndefined";
import { decodeValue } from "../value/decode";
import { ObjectParameters } from "./schema";

export const decodeObject = (binary: Binary, parameters: ObjectParameters): Record<string, any> => {
	const object: Record<string, any> = {};
	let currentLength = 0;

	parameters.propertyParametersEntries.forEach((parametersEntry, i) => {
		const bitLength = 32 - Math.clz32(i) || 1;

		const index = decodeInteger(binary, {
			type: "integer",
			bitLength,
			byteLength: Math.ceil(bitLength / 8),
			minimum: 0,
			multipleOf: 1,
		});

		if (index !== i) return;

		const [key, valueParameters] = parametersEntry;

		const value = decodeValue(binary, valueParameters);

		object[key] = value;
		currentLength = currentLength + 1;
	});

	if (!parameters.additionalPropertyParameters) return object;

	const length = isNotNullOrUndefined(parameters.length) ? parameters.length - currentLength : decodeInteger(binary, parameters.lengthParameters);

	for (let i = 0; i < length; i++) {
		const key = decodeValue(binary, parameters.keyParameters || { type: "string" });
		const value = decodeValue(binary, parameters.additionalPropertyParameters);

		object[key] = value;
	}

	return object;
};
