import { Binary } from "../../Binary";
import { decodeConst } from "./decode";
import { encodeConst } from "./encode";
import { ConstJsonSchema } from "./schema";

it("encodes and decodes const", () => {
	const constValue = "test";

	const schema: ConstJsonSchema = {
		const: "test",
	};

	const binary = new Binary();

	encodeConst(constValue, binary, schema);

	const result = decodeConst(binary, schema);

	expect(result).toBe(constValue);
	expect(binary.readBitIndex).toBe(0);
});
