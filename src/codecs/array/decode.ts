import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { isNotNullOrUndefined } from "../utilities/isNotNullOrUndefined";
import { decodeValue } from "../value/decode";
import { ArrayParameters } from "./schema";

export const decodeArray = (binary: Binary, parameters: ArrayParameters): Array<any> => {
	const array = parameters.prefixParameters.map((itemParameters) => decodeValue(binary, itemParameters));

	if (!parameters.itemParameters) return array;

	const length = isNotNullOrUndefined(parameters.length) ? parameters.length - array.length : decodeInteger(binary, parameters.lengthParameters);

	for (let i = 0; i < length; i++) array.push(decodeValue(binary, parameters.itemParameters));

	return array;
};
