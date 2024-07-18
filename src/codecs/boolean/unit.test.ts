import { Binary } from "../../Binary";
import { decodeBoolean } from "./decode";
import { encodeBoolean } from "./encode";
import { BooleanParameters } from "./schema";

it("encodes and decodes boolean", () => {
	const boolean = true;

	const parameters: BooleanParameters = {
		type: "boolean",
	};

	const binary = new Binary();

	encodeBoolean(boolean, binary, parameters);

	const result = decodeBoolean(binary, parameters);

	expect(result).toBe(boolean);
	expect(binary.readBitIndex).toBe(1);
});
