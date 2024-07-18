import { unpack } from "msgpackr";
import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { AnyParameters } from "./schema";

export const decodeAny = (binary: Binary, _: AnyParameters): any => {
	const length = decodeInteger(binary, { type: "integer", bitLength: 32, byteLength: 4, minimum: 0, multipleOf: 1 });

	return unpack(binary.read(0, length));
};
