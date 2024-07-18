import { Binary } from "../../../../Binary";
import { DEFAULT_LENGTH_PARAMETERS } from "../../../utilities/lengthParameters";
import { decodeBase64 } from "./decode";
import { encodeBase64 } from "./encode";
import { Base64Parameters } from "./schema";

it("encodes and decodes base64", () => {
	const base64 = "afafafaf";

	const parameters: Base64Parameters = {
		type: "base64",
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeBase64(base64, binary, parameters);

	const result = decodeBase64(binary, parameters);

	expect(result).toBe(base64);
	expect(binary.readBitIndex).toBe(80);
});

it("encodes and decodes fixed length base64", () => {
	const base64 = "afafafaf";

	const parameters: Base64Parameters = {
		type: "base64",
		length: 8,
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeBase64(base64, binary, parameters);

	const result = decodeBase64(binary, parameters);

	expect(result).toBe(base64);
	expect(binary.readBitIndex).toBe(48);
});
