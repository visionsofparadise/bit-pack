import { Binary } from "../../Binary";
import { decodeHex } from "./decode";
import { encodeHex } from "./encode";
import { HexJsonSchema } from "./schema";

it("encodes and decodes hex", () => {
	const hex = "afafaf";

	const schema: HexJsonSchema = {
		type: "string",
		contentEncoding: "base16",
	};

	const binary = new Binary();

	encodeHex(hex, binary, schema);

	const result = decodeHex(binary, schema);

	expect(result).toBe(hex);
	expect(binary.readBitIndex).toBe(56);
});

it("encodes and decodes fixed length hex", () => {
	const hex = "afafaf";

	const schema: HexJsonSchema = {
		type: "string",
		contentEncoding: "base16",
		minLength: 6,
		maxLength: 6,
	};

	const binary = new Binary();

	encodeHex(hex, binary, schema);

	const result = decodeHex(binary, schema);

	expect(result).toBe(hex);
	expect(binary.readBitIndex).toBe(24);
});
