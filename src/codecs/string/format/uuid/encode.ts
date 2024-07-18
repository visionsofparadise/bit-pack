import { Binary } from "../../../../Binary";
import { encodeHex } from "../../contentEncoding/hex/encode";
import { UUID_HEX_PARAMETERS, UuidParameters } from "./schema";

export const encodeUuid = (uuid: string, binary: Binary, _: UuidParameters): void => {
	encodeHex(uuid.split("-").join(""), binary, UUID_HEX_PARAMETERS);
};
