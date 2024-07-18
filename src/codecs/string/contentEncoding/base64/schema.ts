import { IntegerParameters } from "../../../integer/schema";

export interface Base64Parameters {
	type: "base64";
	lengthParameters: IntegerParameters;
	length?: number;
}
