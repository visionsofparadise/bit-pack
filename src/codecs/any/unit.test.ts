import { Binary } from "../../Binary";
import { decodeAny } from "./decode";
import { encodeAny } from "./encode";
import { AnyJsonSchema } from "./schema";

it("encodes and decodes any", () => {
	const any = [43, 115, 28];

	const schema: AnyJsonSchema = true;

	const binary = new Binary();

	encodeAny(any, binary, schema);

	const result = decodeAny(binary, schema);

	expect(result).toStrictEqual(any);
	expect(binary.readBitIndex).toBe(64);
});
