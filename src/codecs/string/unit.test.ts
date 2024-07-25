import { Binary } from "../../Binary";
import { decodeString } from "./decode";
import { encodeString } from "./encode";
import { StringJsonSchema } from "./schema";

it("encodes and decodes string", () => {
	const string = "test";

	const schema: StringJsonSchema = {
		type: "string",
	};

	const binary = new Binary();

	encodeString(string, binary, schema);

	const result = decodeString(binary, schema);

	expect(result).toBe(string);
	expect(binary.readBitIndex).toBe(64);
});
