import { Binary } from "../../Binary";
import { encodeEnum } from "../enum/encode";
import { encodeValue } from "../value/encode";
import { JSON_SCHEMA_TYPE_ENUM_SCHEMA, UnionJsonSchema } from "./schema";

export const encodeUnion = (union: any, binary: Binary, schema: UnionJsonSchema): void => {
	const jsonSchemaType = Array.isArray(union)
		? "array"
		: union === null
		? "null"
		: typeof union === "boolean"
		? "boolean"
		: typeof union === "number" && Number.isInteger(union)
		? "integer"
		: typeof union === "number"
		? "number"
		: typeof union === "object"
		? "object"
		: typeof union === "string"
		? "string"
		: undefined;

	if (!jsonSchemaType) throw new Error("Invalid union value");

	encodeEnum(jsonSchemaType, binary, JSON_SCHEMA_TYPE_ENUM_SCHEMA);

	const valueSchema = { ...schema, type: jsonSchemaType };

	encodeValue(union, binary, valueSchema);
};
