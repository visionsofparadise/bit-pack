import { Binary } from "../../Binary";
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

	const binary = new Binary();

	encodeObject(object, binary, schema);

	const result = decodeObject(binary, schema);

	expect(result).toStrictEqual(object);
	expect(binary.readBitIndex).toBe(84);
});

it("encodes and decodes map", () => {
	const object = {
		test1: null,
		test2: null,
		test3: null,
	};

	const schema: ObjectJsonSchema = {
		type: "object",
		propertyNames: { type: "string" },
		additionalProperties: {
			type: "null",
		},
	};

	const binary = new Binary();

	encodeObject(object, binary, schema);

	const result = decodeObject(binary, schema);

	expect(result).toStrictEqual(object);
	expect(binary.readBitIndex).toBe(248);
});
