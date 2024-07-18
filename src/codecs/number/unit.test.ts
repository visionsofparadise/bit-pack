import { Binary } from "../../Binary";
import { decodeNumber } from "./decode";
import { encodeNumber } from "./encode";
import { NumberParameters } from "./schema";

it("encodes and decodes number", () => {
	const number = 63.124534534;

	const parameters: NumberParameters = {
		type: "number",
	};

	const binary = new Binary();

	encodeNumber(number, binary, parameters);

	const result = decodeNumber(binary, parameters);

	expect(result).toBe(number);
	expect(binary.readBitIndex).toBe(64);
});
