import { Binary } from "../../Binary";
import { decodeInteger } from "./decode";
import { encodeInteger } from "./encode";
import { IntegerParameters } from "./schema";

it("encodes and decodes integer", () => {
	const integer = 63;

	const parameters: IntegerParameters = {
		type: "integer",
		bitLength: 7,
		byteLength: 1,
		minimum: 0,
		multipleOf: 1,
	};

	const binary = new Binary();

	encodeInteger(integer, binary, parameters);

	const result = decodeInteger(binary, parameters);

	expect(result).toBe(integer);
	expect(binary.readBitIndex).toBe(7);
});

it("encodes and decodes two integers", () => {
	const integerA = 63;
	const integerB = 27;

	const parameters: IntegerParameters = {
		type: "integer",
		bitLength: 7,
		byteLength: 1,
		minimum: 0,
		multipleOf: 1,
	};

	const binary = new Binary();

	encodeInteger(integerA, binary, parameters);
	encodeInteger(integerB, binary, parameters);

	const resultA = decodeInteger(binary, parameters);
	const resultB = decodeInteger(binary, parameters);

	expect(resultA).toBe(integerA);
	expect(resultB).toBe(integerB);
	expect(binary.readBitIndex).toBe(14);
});
