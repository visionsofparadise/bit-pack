import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeNumber } from "./decode";
import { encodeNumber } from "./encode";
import { NumberParameters } from "./schema";

it("encodes and decodes number", () => {
	const number = 63.124534534;

	const parameters: NumberParameters = {
		type: "number",
	};

	benchmarkCodec(
		"number",
		number,
		(binary) => encodeNumber(number, binary, parameters),
		(binary) => decodeNumber(binary, parameters)
	);

	expect(true).toBe(true);
});
