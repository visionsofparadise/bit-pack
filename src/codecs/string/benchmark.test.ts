import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeString } from "./decode";
import { encodeString } from "./encode";
import { StringParameters } from "./schema";

it("benchmarks string codec", () => {
	const string = "test";

	const parameters: StringParameters = {
		type: "string",
	};

	benchmarkCodec(
		"string",
		string,
		(binary) => encodeString(string, binary, parameters),
		(binary) => decodeString(binary, parameters)
	);

	expect(true).toBe(true);
});
