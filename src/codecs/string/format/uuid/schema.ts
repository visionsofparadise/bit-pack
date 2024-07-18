import { DEFAULT_LENGTH_PARAMETERS } from "../../../utilities/lengthParameters";
import { HexParameters } from "../../contentEncoding/hex/schema";

export const UUID_HEX_PARAMETERS: HexParameters = {
	type: "hex",
	length: 32,
	lengthParameters: DEFAULT_LENGTH_PARAMETERS,
};

export interface UuidParameters {
	type: "uuid";
}
