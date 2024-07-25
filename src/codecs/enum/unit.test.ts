import { Binary } from "../../Binary";
import { decodeEnum } from "./decode";
import { encodeEnum } from "./encode";
import { EnumJsonSchema } from "./schema";

it("encodes and decodes enum", () => {
	const enumValue = "test";

	const schema: EnumJsonSchema = {
		enum: ["test", "1", "2", "3"],
	};

	const binary = new Binary();

	encodeEnum(enumValue, binary, schema);

	const result = decodeEnum(binary, schema);

	expect(result).toBe(enumValue);
	expect(binary.readBitIndex).toBe(2);
});
