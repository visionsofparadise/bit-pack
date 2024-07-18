import { Binary } from "../../Binary";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { decodeArray } from "./decode";
import { encodeArray } from "./encode";
import { ArrayParameters } from "./schema";

it("encodes and decodes array", () => {
	const array = [43, 115, 28];

	const parameters: ArrayParameters = {
		type: "array",
		prefixParameters: [],
		itemParameters: { type: "integer", bitLength: 7, byteLength: 1, minimum: 0, multipleOf: 1 },
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeArray(array, binary, parameters);

	const result = decodeArray(binary, parameters);

	expect(result).toStrictEqual(array);
	expect(binary.readBitIndex).toBe(53);
});

it("encodes and decodes prefixed array", () => {
	const array = ["test", true, 43, 115, 28];

	const parameters: ArrayParameters = {
		type: "array",
		prefixParameters: [{ type: "string", lengthParameters: DEFAULT_LENGTH_PARAMETERS }, { type: "boolean" }],
		itemParameters: { type: "integer", bitLength: 7, byteLength: 1, minimum: 0, multipleOf: 1 },
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	const binary = new Binary();

	encodeArray(array, binary, parameters);

	const result = decodeArray(binary, parameters);

	expect(result).toStrictEqual(array);
	expect(binary.readBitIndex).toBe(118);
});
