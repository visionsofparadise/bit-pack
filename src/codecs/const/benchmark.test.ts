import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeConst } from "./decode";
import { encodeConst } from "./encode";
import { ConstJsonSchema } from "./schema";

it("encodes and decodes const", () => {
	const constValue = "test";

	const schema: ConstJsonSchema = {
		const: "test",
	};

	benchmarkCodec(
		"const",
		constValue,
		(binary) => encodeConst(constValue, binary, schema),
		(binary) => decodeConst(binary, schema)
	);
});
