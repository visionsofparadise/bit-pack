import { benchmarkCodec } from "../../utilities/benchmarkCodec";
import { decodeObject } from "./decode";
import { encodeObject } from "./encode";
import { ObjectJsonSchema } from "./schema";

it("encodes and decodes object", () => {
	const object = {
		test1: "test1",
		test2: 123,
		test3: true,
	};

	const schema: ObjectJsonSchema = {
		type: "object",
		properties: {
			test1: { type: "string" },
			test2: { type: "integer", minimum: 0, maximum: 127, multipleOf: 1 },
			test3: { type: "boolean" },
		},
		propertyNames: { type: "string" },
	};

	benchmarkCodec(
		"object",
		object,
		(binary) => encodeObject(object, binary, schema),
		(binary) => decodeObject(binary, schema)
	);

	expect(true).toBe(true);
});
