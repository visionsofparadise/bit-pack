import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { encodeValue } from "../value/encode";
import { ObjectParameters } from "./schema";

export const encodeObject = (object: Record<string, any>, binary: Binary, parameters: ObjectParameters): void => {
	parameters.propertyParametersEntries.forEach((parametersEntry, i) => {
		const bitLength = 32 - Math.clz32(i) || 1;

		encodeInteger(i, binary, {
			type: "integer",
			bitLength,
			byteLength: Math.ceil(bitLength / 8),
			minimum: 0,
			multipleOf: 1,
		});

		const [key, valueParameters] = parametersEntry;

		const value = object[key];

		if (value === undefined) return;

		encodeValue(value, binary, valueParameters);
	});

	if (!parameters.additionalPropertyParameters) return;

	const restEntries = Object.entries(object).filter(([key]) => !parameters.evaluatedKeys.has(key));

	if (restEntries.length === 0) return;

	parameters.length ?? encodeInteger(restEntries.length, binary, parameters.lengthParameters);

	for (const [key, value] of restEntries) {
		encodeValue(key, binary, parameters.keyParameters || { type: "string", lengthParameters: DEFAULT_LENGTH_PARAMETERS });
		encodeValue(value, binary, parameters.additionalPropertyParameters);
	}
};
