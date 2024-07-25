import { Binary } from "../../Binary";
import { decodeUnion } from "./decode";
import { encodeUnion } from "./encode";
import { UnionJsonSchema } from "./schema";

it("encodes and decodes union", () => {
	const integer = 43;
	const nullValue = null;

	const parameters: UnionJsonSchema = {
		type: ["integer", "null"],
		minimum: 0,
		maximum: 127,
	};

	const binary = new Binary();

	encodeUnion(integer, binary, parameters);
	encodeUnion(nullValue, binary, parameters);

	const integerResult = decodeUnion(binary, parameters);
	const nullResult = decodeUnion(binary, parameters);

	expect(integerResult).toStrictEqual(integer);
	expect(nullResult).toStrictEqual(null);
	expect(binary.readBitIndex).toBe(13);
});
