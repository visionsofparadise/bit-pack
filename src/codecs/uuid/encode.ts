import { Binary } from "../../Binary";
import { encodeHex } from "../hex/encode";
import { UUID_HEX_JSON_SCHEMA, UuidJsonSchema } from "./schema";

export const encodeUuid = (uuid: string, binary: Binary, _: UuidJsonSchema): void => {
	encodeHex(uuid.split("-").join(""), binary, UUID_HEX_JSON_SCHEMA);
};
