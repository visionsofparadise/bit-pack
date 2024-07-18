import { benchmarkCodec } from "../utilities/benchmarkCodec";
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

	benchmarkCodec(
		"enum",
		enumValue,
		(binary) => encodeEnum(enumValue, binary, parameters),
		(binary) => decodeEnum(binary, parameters)
	);
});
