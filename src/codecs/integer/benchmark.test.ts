import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeInteger } from "./decode";
import { encodeInteger } from "./encode";
import { IntegerParameters } from "./schema";

it("benchmarks integer codec", () => {
	const integer = 87;

	const parameters: IntegerParameters = {
		type: "integer",
		bitLength: 8,
		byteLength: 1,
		minimum: 0,
		multipleOf: 1,
	};

	benchmarkCodec(
		"integer",
		integer,
		(binary) => encodeInteger(integer, binary, parameters),
		(binary) => decodeInteger(binary, parameters)
	);

	expect(true).toBe(true);
});
