import { Binary } from "../../Binary";
import { decodeUnion } from "./decode";
import { encodeUnion } from "./encode";
import { UnionParameters } from "./schema";

it("encodes and decodes union", () => {
	const integer = 43;
	const nullValue = null;

	const parameters: UnionParameters = {
		type: "union",
		parametersMap: {
			integer: {
				type: "integer",
				bitLength: 7,
				byteLength: 1,
				minimum: 0,
				multipleOf: 1,
			},
			null: {
				type: "null",
			},
		},
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
