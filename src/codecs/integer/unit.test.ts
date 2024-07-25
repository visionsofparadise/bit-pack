import { Binary } from "../../Binary";
import { decodeInteger } from "./decode";
import { encodeInteger } from "./encode";
import { IntegerJsonSchema } from "./schema";

it("encodes and decodes integer", () => {
	const integer = 63;

	const schema: IntegerJsonSchema = {
		type: "integer",
		minimum: 0,
		maximum: 127,
	};

	const binary = new Binary();

	encodeInteger(integer, binary, schema);

	const result = decodeInteger(binary, schema);

	expect(result).toBe(integer);
	expect(binary.readBitIndex).toBe(7);
});

it("encodes and decodes two integers", () => {
	const integerA = 63;
	const integerB = 27;

	const schema: IntegerJsonSchema = {
		type: "integer",
		minimum: 0,
		maximum: 127,
	};

	const binary = new Binary();

	encodeInteger(integerA, binary, schema);
	encodeInteger(integerB, binary, schema);

	const resultA = decodeInteger(binary, schema);
	const resultB = decodeInteger(binary, schema);

	expect(resultA).toBe(integerA);
	expect(resultB).toBe(integerB);
	expect(binary.readBitIndex).toBe(14);
});
