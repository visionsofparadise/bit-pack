import { unpack } from "msgpackr";
import { Binary } from "../../Binary";
import { MAX_32_BIT_INTEGER } from "../../utilities/calculateIntegerBitLength";
import { decodeInteger } from "../integer/decode";
import { AnyJsonSchema } from "./schema";

export const decodeAny = (binary: Binary, _: AnyJsonSchema): any => {
	const length = decodeInteger(binary, { type: "integer", minimum: 0, maximum: MAX_32_BIT_INTEGER, multipleOf: 1 });

	return unpack(binary.read(0, length));
};
