import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { isNotNullOrUndefined } from "../utilities/isNotNullOrUndefined";
import { EnumParameters } from "./schema";

export const encodeEnum = (enumValue: string | number | boolean, binary: Binary, parameters: EnumParameters): void => {
	const index = parameters.valueMap.get(enumValue);

	if (!isNotNullOrUndefined(index)) return;

	return encodeInteger(index, binary, parameters.lengthParameters);
};
