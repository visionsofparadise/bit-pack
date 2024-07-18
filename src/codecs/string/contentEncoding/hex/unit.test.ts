import { Binary } from "../../../../Binary";
import { DEFAULT_LENGTH_PARAMETERS } from "../../../utilities/lengthParameters";
import { decodeHex } from "./decode";
import { encodeHex } from "./encode";
import { HexParameters } from "./schema";

it("encodes and decodes hex", () => {
	const hex = "afafaf";

	const parameters: HexParameters = {
		type: "hex",
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeHex(hex, binary, parameters);

	const result = decodeHex(binary, parameters);

	expect(result).toBe(hex);
	expect(binary.readBitIndex).toBe(56);
});

it("encodes and decodes fixed length hex", () => {
	const hex = "afafaf";

	const parameters: HexParameters = {
		type: "hex",
		length: 6,
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeHex(hex, binary, parameters);

	const result = decodeHex(binary, parameters);

	expect(result).toBe(hex);
	expect(binary.readBitIndex).toBe(24);
});
