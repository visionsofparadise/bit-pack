import { Binary } from "../../Binary";
import { decodeHex } from "../hex/decode";
import { UUID_HEX_JSON_SCHEMA, UuidJsonSchema } from "./schema";

export const decodeUuid = (binary: Binary, _: UuidJsonSchema): string => {
	const hex = decodeHex(binary, UUID_HEX_JSON_SCHEMA);

	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
