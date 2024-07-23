import { JSONSchema } from "json-schema-to-ts";
import { Binary } from "../../Binary";
import { decodeValue } from "./decode";
import { encodeValue } from "./encode";
import { prepareValueSchema } from "./prepareSchema";

it("encodes spread of all values", () => {
	const schema: Exclude<JSONSchema, boolean> = {
		$id: "value",
		type: "object",
		properties: {
			array: {
				type: "array",
				items: { type: "string", minLength: 8, maxLength: 8, contentEncoding: "base64" },
				minItems: 0,
				maxItems: 15,
			},
			boolean: {
				type: "boolean",
			},
			const: {
				const: "test",
			},
			date: {
				type: "string",
				format: "date",
			},
			dateTime: {
				type: "string",
				format: "date-time",
			},
			enum: {
				enum: [1, 2, 3],
			},
			integer: {
				type: "integer",
				minimum: 0,
				maximum: 127,
			},
			ipv4: {
				type: "string",
				format: "ipv4",
			},
			map: {
				type: "object",
				additionalProperties: { type: "null" },
			},
			number: {
				type: "number",
			},
			string: {
				type: "string",
				minLength: 0,
				maxLength: 255,
			},
			time: {
				type: "string",
				format: "time",
			},
			tuple: {
				type: "array",
				prefixItems: [{ type: "string", minLength: 4, maxLength: 4, contentEncoding: "base16" }],
			},
		},
		propertyNames: {
			minLength: 0,
			maxLength: 15,
		},
	} as any;

	const parameters = prepareValueSchema(schema);

	const value = {
		array: ["afafafaf", "afafafaf", "afafafaf"],
		boolean: true,
		const: "test",
		date: new Date().toISOString().split("T")[0],
		dateTime: new Date().toISOString().split("T")[0] + "T12:32:27+01:00",
		enum: 2,
		integer: 53,
		ipv4: "255.255.255.255",
		map: {
			test1: null,
			test2: null,
			test3: null,
		},
		number: 63.124534534,
		string: "test",
		time: "12:32:27+01:00",
		tuple: ["afaf"],
	};

	const binary = new Binary();

	encodeValue(value, binary, parameters);

	const result = decodeValue(binary, parameters);

	expect(result).toStrictEqual(value);
	expect(binary.readBitIndex).toBe(718);
});
