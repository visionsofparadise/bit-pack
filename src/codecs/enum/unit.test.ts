import { Binary } from "../../Binary";
import { decodeEnum } from "./decode";
import { encodeEnum } from "./encode";
import { EnumParameters } from "./schema";

it("encodes and decodes enum", () => {
	const enumValue = "test";

	const values = ["test", "1", "2", "3"];

	const parameters: EnumParameters = {
		type: "enum",
		values,
		valueMap: new Map(values.map((value, index) => [value, index])),
		lengthParameters: {
			type: "integer",
			bitLength: 2,
			byteLength: 1,
			minimum: 0,
			multipleOf: 1,
		},
	};

	const binary = new Binary();

	encodeEnum(enumValue, binary, parameters);

	const result = decodeEnum(binary, parameters);

	expect(result).toBe(enumValue);
	expect(binary.readBitIndex).toBe(2);
});
