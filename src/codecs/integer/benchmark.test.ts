import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeInteger } from "./decode";
import { encodeInteger } from "./encode";
import { IntegerJsonSchema } from "./schema";

it("benchmarks integer codec", () => {
	const integer = 87;

	const schema: IntegerJsonSchema = {
		type: "integer",
		minimum: 0,
		maximum: 255,
	};

	benchmarkCodec(
		"integer",
		integer,
		(binary) => encodeInteger(integer, binary, schema),
		(binary) => decodeInteger(binary, schema)
	);

	expect(true).toBe(true);
});
