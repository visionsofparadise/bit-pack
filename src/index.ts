import { Binary } from "./Binary";
import { decodeValue } from "./codecs/value/decode";
import { encodeValue } from "./codecs/value/encode";
import { WebSafeBuffer } from "./utilities/SafeBuffer";

export const encode = <V>(data: V, schema: any): WebSafeBuffer => {
	const binary = new Binary();

	encodeValue(data, binary, schema);

	return binary.toBuffer();
};

export const decode = <V>(data: Uint8Array, schema: any): V => {
	const binary = new Binary(data);

	return decodeValue(binary, schema) as V;
};

export default {
	encode,
	decode,
};
