import { JSONSchema } from "json-schema-to-ts";
import { JSONSchemaType } from "json-schema-to-ts/lib/types/definitions";
import { ArrayParameters } from "../array/schema";
import { BooleanParameters } from "../boolean/schema";
import { EnumParameters } from "../enum/schema";
import { IntegerParameters } from "../integer/schema";
import { NullParameters } from "../null/schema";
import { NumberParameters } from "../number/schema";
import { ObjectParameters } from "../object/schema";
import { StringParameters } from "../string/schema";

export const isUnionJsonSchema = (schema: JSONSchema): schema is UnionJsonSchema => typeof schema !== "boolean" && Array.isArray(schema.type);

export interface UnionJsonSchema {
	type: Array<JSONSchemaType>;
}

const JSON_SCHEMA_TYPE_ENUM_VALUES = ["array", "boolean", "integer", "null", "number", "object", "string"];

export const JSON_SCHEMA_TYPE_ENUM_PARAMETERS: EnumParameters = {
	type: "enum",
	values: JSON_SCHEMA_TYPE_ENUM_VALUES,
	valueMap: new Map(JSON_SCHEMA_TYPE_ENUM_VALUES.map((value, index) => [value, index])),
	lengthParameters: {
		type: "integer",
		bitLength: 3,
		byteLength: 1,
		minimum: 0,
		multipleOf: 1,
	},
};

interface TypeParametersMap {
	array: ArrayParameters;
	boolean: BooleanParameters;
	integer: IntegerParameters;
	null: NullParameters;
	number: NumberParameters;
	object: ObjectParameters;
	string: StringParameters;
}

export interface UnionParameters {
	type: "union";
	parametersMap: Partial<TypeParametersMap>;
}
