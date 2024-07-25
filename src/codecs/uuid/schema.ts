import { HexJsonSchema } from "../hex/schema";

export const UUID_HEX_JSON_SCHEMA: HexJsonSchema = {
	type: "string",
	contentEncoding: "base16",
	minLength: 32,
	maxLength: 32,
};

export interface UuidJsonSchema {
	type: "string";
	format: "uuid";
}
