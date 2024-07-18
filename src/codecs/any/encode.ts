import { pack } from "msgpackr";
import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { AnyParameters } from "./schema";

export const encodeAny = (any: any, binary: Binary, _: AnyParameters): void => {
	const buffer = pack(any);

	encodeInteger(buffer.byteLength, binary, { type: "integer", bitLength: 32, byteLength: 4, minimum: 0, multipleOf: 1 });

	binary.write(buffer, 0, buffer.byteLength);
};
