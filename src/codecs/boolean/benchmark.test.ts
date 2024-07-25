import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeBoolean } from "./decode";
import { encodeBoolean } from "./encode";
import { BooleanJsonSchema } from "./schema";

it("encodes and decodes boolean", () => {
	const boolean = true;

	const schema: BooleanJsonSchema = {
		type: "boolean",
	};

	benchmarkCodec(
		"boolean",
		boolean,
		(binary) => encodeBoolean(boolean, binary, schema),
		(binary) => decodeBoolean(binary, schema)
	);

	expect(true).toBe(true);
});
