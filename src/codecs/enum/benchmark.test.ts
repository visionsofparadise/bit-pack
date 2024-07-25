import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeEnum } from "./decode";
import { encodeEnum } from "./encode";
import { EnumJsonSchema } from "./schema";

it("encodes and decodes enum", () => {
	const enumValue = "test";

	const schema: EnumJsonSchema = {
		enum: ["test", "1", "2", "3"],
	};

	benchmarkCodec(
		"enum",
		enumValue,
		(binary) => encodeEnum(enumValue, binary, schema),
		(binary) => decodeEnum(binary, schema)
	);
});
