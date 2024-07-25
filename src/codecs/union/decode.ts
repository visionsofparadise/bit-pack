import { Binary } from "../../Binary";
import { decodeEnum } from "../enum/decode";
import { decodeValue } from "../value/decode";
import { JSON_SCHEMA_TYPE_ENUM_SCHEMA, UnionJsonSchema } from "./schema";

export const decodeUnion = (binary: Binary, schema: UnionJsonSchema): any => {
	const jsonSchemaType = decodeEnum(binary, JSON_SCHEMA_TYPE_ENUM_SCHEMA);

	const valueSchema = { ...schema, type: jsonSchemaType };

	return decodeValue(binary, valueSchema);
};
