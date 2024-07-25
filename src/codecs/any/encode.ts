import { pack } from "msgpackr";
import { Binary } from "../../Binary";
import { MAX_32_BIT_INTEGER } from "../../utilities/calculateIntegerBitLength";
import { encodeInteger } from "../integer/encode";
import { AnyJsonSchema } from "./schema";

export const encodeAny = (any: any, binary: Binary, _: AnyJsonSchema): void => {
	const buffer = pack(any);

	encodeInteger(buffer.byteLength, binary, { type: "integer", minimum: 0, maximum: MAX_32_BIT_INTEGER, multipleOf: 1 });

	binary.write(buffer, 0, buffer.byteLength);
};
