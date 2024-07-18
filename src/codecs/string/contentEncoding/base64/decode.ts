import { Binary } from "../../../../Binary";
import { decodeInteger } from "../../../integer/decode";
import { Base64Parameters } from "./schema";

export const decodeBase64 = (binary: Binary, parameters: Base64Parameters): string => {
	const length = parameters.length ?? decodeInteger(binary, parameters.lengthParameters);

	return binary.read(0, length * (3 / 4)).toString("base64");
};
