import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeNull } from "./decode";
import { encodeNull } from "./encode";
import { NullParameters } from "./schema";

it("encodes and decodes null", () => {
	const nullValue = null;

	const parameters: NullParameters = {
		type: "null",
	};

	benchmarkCodec(
		"null",
		nullValue,
		(binary) => encodeNull(nullValue, binary, parameters),
		(binary) => decodeNull(binary, parameters)
	);

	expect(true).toBe(true);
});
