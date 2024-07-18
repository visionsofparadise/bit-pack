import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeConst } from "./decode";
import { encodeConst } from "./encode";
import { ConstParameters } from "./schema";

it("encodes and decodes const", () => {
	const constValue = "test";

	const parameters: ConstParameters = {
		type: "const",
		value: "test",
	};

	benchmarkCodec(
		"const",
		constValue,
		(binary) => encodeConst(constValue, binary, parameters),
		(binary) => decodeConst(binary, parameters)
	);
});
