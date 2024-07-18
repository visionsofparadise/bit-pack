import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { encodeValue } from "../value/encode";
import { ArrayParameters } from "./schema";

export const encodeArray = (array: Array<any>, binary: Binary, parameters: ArrayParameters): void => {
	parameters.prefixParameters.forEach((itemParameters, i) => encodeValue(array.at(i), binary, itemParameters));

	if (!parameters.itemParameters) return;

	parameters.length ?? encodeInteger(array.length - parameters.prefixParameters.length, binary, parameters.lengthParameters);

	for (let i = parameters.prefixParameters.length; i < array.length; i++) encodeValue(array[i], binary, parameters.itemParameters);
};
