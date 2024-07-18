import { randomBytes } from "crypto";
import { JSONSchema } from "json-schema-to-ts";
import { benchmark } from "./codecs/utilities/benchmark";

it("benchmarks for spread of all types", () => {
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

	benchmark(
		"typeSpread",
		value,
		schema,
		(miniBit) => miniBit.encode(value, schema["$id"]!),
		(miniBit, buffer) => miniBit.decode(buffer, schema["$id"]!)
	);

	expect(true).toStrictEqual(true);
});

it("benchmarks for many hex strings", () => {
	const value = {
		array: new Array(100).fill(undefined).map(() => randomBytes(16).toString("hex")),
	};

	const schema: Exclude<JSONSchema, boolean> = {
		$id: "value",
		type: "object",
		properties: {
			array: {
				type: "array",
				items: { type: "string", minLength: 32, maxLength: 32, contentEncoding: "base16" },
				minItems: 0,
				maxItems: 100,
			},
		},
		propertyNames: {
			minLength: 0,
			maxLength: 15,
		},
	};

	benchmark(
		"hexArray",
		value,
		schema,
		(miniBit) => miniBit.encode(value, schema["$id"]!),
		(miniBit, buffer) => miniBit.decode(buffer, schema["$id"]!)
	);

	expect(true).toStrictEqual(true);
});
