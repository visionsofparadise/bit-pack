import { Binary } from "../../Binary";
import { decodeBase64 } from "./decode";
import { encodeBase64 } from "./encode";
import { Base64JsonSchema } from "./schema";

it("encodes and decodes base64", () => {
	const base64 = "afafafaf";

	const schema: Base64JsonSchema = {
		type: "string",
		contentEncoding: "base64",
	};

	const binary = new Binary();

	encodeBase64(base64, binary, schema);

	const result = decodeBase64(binary, schema);

	expect(result).toBe(base64);
	expect(binary.readBitIndex).toBe(80);
});

it("encodes and decodes fixed length base64", () => {
	const base64 = "afafafaf";

	const schema: Base64JsonSchema = {
		type: "string",
		contentEncoding: "base64",
		minLength: 8,
		maxLength: 8,
	};

	const binary = new Binary();

	encodeBase64(base64, binary, schema);

	const result = decodeBase64(binary, schema);

	expect(result).toBe(base64);
	expect(binary.readBitIndex).toBe(48);
});
