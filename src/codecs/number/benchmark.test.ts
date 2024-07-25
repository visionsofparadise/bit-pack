import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeNumber } from "./decode";
import { encodeNumber } from "./encode";
import { NumberJsonSchema } from "./schema";

it("encodes and decodes number", () => {
	const number = 63.124534534;

	const schema: NumberJsonSchema = {
		type: "number",
	};

	benchmarkCodec(
		"number",
		number,
		(binary) => encodeNumber(number, binary, schema),
		(binary) => decodeNumber(binary, schema)
	);

	expect(true).toBe(true);
});
