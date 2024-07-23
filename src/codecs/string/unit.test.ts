import { Binary } from "../../Binary";
import { decodeString } from "./decode";
import { encodeString } from "./encode";
import { StringParameters } from "./schema";

it("encodes and decodes string", () => {
	const string = "test";

	const parameters: StringParameters = {
		type: "string",
	};

	const binary = new Binary();

	encodeString(string, binary, parameters);

	const result = decodeString(binary, parameters);

	expect(result).toBe(string);
	expect(binary.readBitIndex).toBe(64);
});
