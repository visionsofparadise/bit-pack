import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { decodeBoolean } from "./decode";
import { encodeBoolean } from "./encode";
import { BooleanParameters } from "./schema";

it("encodes and decodes boolean", () => {
	const boolean = true;

	const parameters: BooleanParameters = {
		type: "boolean",
	};

	benchmarkCodec(
		"boolean",
		boolean,
		(binary) => encodeBoolean(boolean, binary, parameters),
		(binary) => decodeBoolean(binary, parameters)
	);

	expect(true).toBe(true);
});
