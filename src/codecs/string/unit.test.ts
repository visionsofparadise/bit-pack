import { Binary } from "../../Binary";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { decodeString } from "./decode";
import { encodeString } from "./encode";
import { StringParameters } from "./schema";

it("encodes and decodes string", () => {
	const string = "test";

	const parameters: StringParameters = {
		type: "string",
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeString(string, binary, parameters);

	const result = decodeString(binary, parameters);

	expect(result).toBe(string);
	expect(binary.readBitIndex).toBe(64);
});
