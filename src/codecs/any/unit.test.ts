import { Binary } from "../../Binary";
import { decodeAny } from "./decode";
import { encodeAny } from "./encode";
import { AnyParameters } from "./schema";

it("encodes and decodes any", () => {
	const any = [43, 115, 28];

	const parameters: AnyParameters = {
		type: "any",
	};

	const binary = new Binary();

	encodeAny(any, binary, parameters);

	const result = decodeAny(binary, parameters);

	expect(result).toStrictEqual(any);
	expect(binary.readBitIndex).toBe(64);
});
