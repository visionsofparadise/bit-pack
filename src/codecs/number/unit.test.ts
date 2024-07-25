import { Binary } from "../../Binary";
import { decodeNumber } from "./decode";
import { encodeNumber } from "./encode";
import { NumberJsonSchema } from "./schema";

it("encodes and decodes number", () => {
	const number = 63.124534534;

	const schema: NumberJsonSchema = {
		type: "number",
	};

	const binary = new Binary();

	encodeNumber(number, binary, schema);

	const result = decodeNumber(binary, schema);

	expect(result).toBe(number);
	expect(binary.readBitIndex).toBe(64);
});
