import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { decodeArray } from "./decode";
import { encodeArray } from "./encode";
import { ArrayParameters } from "./schema";

it("benchmarks array codec", () => {
	const array = ["afaf", "afaf", "afaf", "afaf", "afaf", "afaf"];

	const parameters: ArrayParameters = {
		type: "array",
		itemParameters: {
			type: "hex",
			length: 4,
			lengthParameters: DEFAULT_LENGTH_PARAMETERS,
		},
		prefixParameters: [],
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	benchmarkCodec(
		"array",
		array,
		(binary) => encodeArray(array, binary, parameters),
		(binary) => decodeArray(binary, parameters)
	);

	expect(true).toBe(true);
});
