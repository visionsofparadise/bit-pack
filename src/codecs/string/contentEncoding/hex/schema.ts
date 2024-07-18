import { IntegerParameters } from "../../../integer/schema";

export interface HexParameters {
	type: "hex";
	lengthParameters: IntegerParameters;
	length?: number;
}
