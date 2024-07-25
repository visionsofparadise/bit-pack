import { Binary } from "../../Binary";
import { decodeBoolean } from "./decode";
import { encodeBoolean } from "./encode";
import { BooleanJsonSchema } from "./schema";

it("encodes and decodes boolean", () => {
	const boolean = true;

	const schema: BooleanJsonSchema = {
		type: "boolean",
	};

	const binary = new Binary();

	encodeBoolean(boolean, binary, schema);

	const result = decodeBoolean(binary, schema);

	expect(result).toBe(boolean);
	expect(binary.readBitIndex).toBe(1);
});
