import { Suite } from "benchmark";
import { pack, unpack } from "msgpackr";
import { BitPack } from "../..";
import { WebSafeBuffer } from "./SafeBuffer";
const console = require("console");

global.console = console;

export const benchmark = (name: string, value: any, schema: any, encodeFn: (bitPack: BitPack) => any, decodeFn: (bitPack: BitPack, buffer: Buffer) => any) => {
	const bitPack = new BitPack([schema]);

	const bitPackEncodeId = `bitPack.encode.${name}`;

	new Suite("encode")
		.add(bitPackEncodeId, () => {
			encodeFn(bitPack);
		})
		.add("msgpack.pack".padEnd(bitPackEncodeId.length, " "), () => {
			pack(value);
		})
		.add("JSON.stringify".padEnd(bitPackEncodeId.length, " "), () => {
			Buffer.from(JSON.stringify(value));
		})
		.on("cycle", (event: any) => {
			console.log(String(event.target).split(" x ").join("	"));
		})
		.run();

	const bitPackBuffer = bitPack.encode(value, schema["$id"]!);
	const msgPackBuffer = pack(value);
	const jsonBuffer = WebSafeBuffer.from(JSON.stringify(value));

	const bitPackDecodeId = `bitPack.decode.${name}`;

	new Suite("decode")
		.add(bitPackDecodeId, () => {
			decodeFn(bitPack, bitPackBuffer);
		})
		.add("msgpack.unpack".padEnd(bitPackDecodeId.length, " "), () => {
			unpack(msgPackBuffer);
		})
		.add("JSON.parse".padEnd(bitPackDecodeId.length, " "), () => {
			JSON.parse(jsonBuffer.toString());
		})
		.on("cycle", (event: any) => {
			console.log(String(event.target).split(" x ").join("	"));
		})
		.run();

	console.log("");

	console.log(`bitPack size:	${bitPackBuffer.byteLength}`);
	console.log(`msgpack size:	${msgPackBuffer.byteLength}`);
	console.log(`JSON size:   	${jsonBuffer.byteLength}`);
};
