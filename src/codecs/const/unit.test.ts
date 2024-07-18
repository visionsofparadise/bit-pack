import { Binary } from "../../Binary";
import { decodeConst } from "./decode";
import { encodeConst } from "./encode";
import { ConstParameters } from "./schema";

it("encodes and decodes const", () => {
	const constValue = "test";

	const parameters: ConstParameters = {
		type: "const",
		value: "test",
	};

	const binary = new Binary();

	encodeConst(constValue, binary, parameters);

	const result = decodeConst(binary, parameters);

	expect(result).toBe(constValue);
	expect(binary.readBitIndex).toBe(0);
});
