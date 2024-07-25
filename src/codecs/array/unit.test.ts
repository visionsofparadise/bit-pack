import { Binary } from "../../Binary";
import { decodeArray } from "./decode";
import { encodeArray } from "./encode";
import { ArrayJsonSchema } from "./schema";

it("encodes and decodes array", () => {
	const array = [43, 115, 28];

	const schema: ArrayJsonSchema = {
		type: "array",
		items: { type: "integer", minimum: 0, maximum: 127, multipleOf: 1 },
	};

	const binary = new Binary();

	encodeArray(array, binary, schema);

	const result = decodeArray(binary, schema);

	expect(result).toStrictEqual(array);
	expect(binary.readBitIndex).toBe(53);
});

it("encodes and decodes prefixed array", () => {
	const array = ["test", true, 43, 115, 28];

	const schema: ArrayJsonSchema = {
		type: "array",
		prefixItems: [{ type: "string" }, { type: "boolean" }],
		items: { type: "integer", minimum: 0, maximum: 127, multipleOf: 1 },
	};

	const binary = new Binary();

	encodeArray(array, binary, schema);

	const result = decodeArray(binary, schema);

	expect(result).toStrictEqual(array);
	expect(binary.readBitIndex).toBe(118);
});
