import { Binary } from "../../../../Binary";
import { decodeInteger } from "../../../integer/decode";
import { HexParameters } from "./schema";

export const decodeHex = (binary: Binary, parameters: HexParameters): string => {
	const length = parameters.length ?? decodeInteger(binary, parameters.lengthParameters);

	return binary.read(0, length / 2).toString("hex");
};
