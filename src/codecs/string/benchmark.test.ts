import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeString } from "./decode";
import { encodeString } from "./encode";
import { StringJsonSchema } from "./schema";

it("benchmarks string codec", () => {
	const string = "test";

	const schema: StringJsonSchema = {
		type: "string",
	};

	benchmarkCodec(
		"string",
		string,
		(binary) => encodeString(string, binary, schema),
		(binary) => decodeString(binary, schema)
	);

	expect(true).toBe(true);
});
