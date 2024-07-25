import { Binary } from "../../Binary";
import { decodeNull } from "./decode";
import { encodeNull } from "./encode";
import { NullJsonSchema } from "./schema";

it("encodes and decodes null", () => {
	const nullValue = null;

	const schema: NullJsonSchema = {
		type: "null",
	};

	const binary = new Binary();

	encodeNull(nullValue, binary, schema);

	const result = decodeNull(binary, schema);

	expect(result).toBe(nullValue);
	expect(binary.readBitIndex).toBe(0);
});
