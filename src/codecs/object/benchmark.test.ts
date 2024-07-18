import { benchmarkCodec } from "../utilities/benchmarkCodec";
import { DEFAULT_LENGTH_PARAMETERS } from "../utilities/lengthParameters";
import { decodeObject } from "./decode";
import { encodeObject } from "./encode";
import { ObjectParameters } from "./schema";

it("encodes and decodes object", () => {
	const object = {
		test1: "test1",
		test2: 123,
		test3: true,
	};

	const parameters: ObjectParameters = {
		type: "object",
		propertyParametersEntries: [
			["test1", { type: "string", lengthParameters: DEFAULT_LENGTH_PARAMETERS }],
			["test2", { type: "integer", bitLength: 7, byteLength: 1, minimum: 0, multipleOf: 1 }],
			["test3", { type: "boolean" }],
		],
		keyParameters: { type: "string", lengthParameters: DEFAULT_LENGTH_PARAMETERS },
		evaluatedKeys: new Set(["test1", "test2", "test3"]),
		lengthParameters: DEFAULT_LENGTH_PARAMETERS,
	};

	benchmarkCodec(
		"object",
		object,
		(binary) => encodeObject(object, binary, parameters),
		(binary) => decodeObject(binary, parameters)
	);

	expect(true).toBe(true);
});
