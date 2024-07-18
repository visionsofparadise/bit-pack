import { Binary } from "../../Binary";
import { decodeNull } from "./decode";
import { encodeNull } from "./encode";
import { NullParameters } from "./schema";

it("encodes and decodes null", () => {
	const nullValue = null;

	const parameters: NullParameters = {
		type: "null",
	};

	const binary = new Binary();

	encodeNull(nullValue, binary, parameters);

	const result = decodeNull(binary, parameters);

	expect(result).toBe(nullValue);
	expect(binary.readBitIndex).toBe(0);
});
