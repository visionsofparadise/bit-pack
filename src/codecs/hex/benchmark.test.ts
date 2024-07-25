import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeHex } from "./decode";
import { encodeHex } from "./encode";
import { HexJsonSchema } from "./schema";

it("encodes and decodes fixed length hex", () => {
	const hex = "afafaf";

	const schema: HexJsonSchema = {
		type: "string",
		contentEncoding: "base16",
		minLength: 6,
		maxLength: 6,
	};

	benchmarkCodec(
		"hex",
		hex,
		(binary) => encodeHex(hex, binary, schema),
		(binary) => decodeHex(binary, schema)
	);

	expect(true).toBe(true);
});
