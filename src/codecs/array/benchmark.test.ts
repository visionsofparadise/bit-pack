import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeArray } from "./decode";
import { encodeArray } from "./encode";
import { ArrayJsonSchema } from "./schema";

it("benchmarks array codec", () => {
	const array = ["afaf", "afaf", "afaf", "afaf", "afaf", "afaf"];

	const schema: ArrayJsonSchema = {
		type: "array",
		items: {
			type: "string",
			contentEncoding: "base16",
			minLength: 4,
			maxLength: 4,
		},
	};

	benchmarkCodec(
		"array",
		array,
		(binary) => encodeArray(array, binary, schema),
		(binary) => decodeArray(binary, schema)
	);

	expect(true).toBe(true);
});
