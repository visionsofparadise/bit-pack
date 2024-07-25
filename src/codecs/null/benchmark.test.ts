import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeNull } from "./decode";
import { encodeNull } from "./encode";
import { NullJsonSchema } from "./schema";

it("encodes and decodes null", () => {
	const nullValue = null;

	const schema: NullJsonSchema = {
		type: "null",
	};

	benchmarkCodec(
		"null",
		nullValue,
		(binary) => encodeNull(nullValue, binary, schema),
		(binary) => decodeNull(binary, schema)
	);

	expect(true).toBe(true);
});
