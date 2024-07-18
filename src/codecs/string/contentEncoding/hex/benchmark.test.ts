import { benchmarkCodec } from "../../../utilities/benchmarkCodec";
import { DEFAULT_LENGTH_PARAMETERS } from "../../../utilities/lengthParameters";
import { decodeHex } from "./decode";
import { encodeHex } from "./encode";
import { HexParameters } from "./schema";

it("encodes and decodes fixed length hex", () => {
	const hex = "afafaf";

	const parameters: HexParameters = {
		type: "hex",
		length: 6,
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	benchmarkCodec(
		"hex",
		hex,
		(binary) => encodeHex(hex, binary, parameters),
		(binary) => decodeHex(binary, parameters)
	);

	expect(true).toBe(true);
});
