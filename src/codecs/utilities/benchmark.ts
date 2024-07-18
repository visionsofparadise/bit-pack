import { Suite } from "benchmark";
import { pack, unpack } from "msgpackr";
import { MiniBit } from "../..";
import { WebSafeBuffer } from "./SafeBuffer";
const console = require("console");

global.console = console;

export const benchmark = (name: string, value: any, schema: any, encodeFn: (miniBit: MiniBit) => any, decodeFn: (miniBit: MiniBit, buffer: Buffer) => any) => {
	const miniBit = new MiniBit([schema]);

	const miniBitEncodeId = `miniBit.encode.${name}`;

	new Suite("encode")
		.add(miniBitEncodeId, () => {
			encodeFn(miniBit);
		})
		.add("msgpack.pack".padEnd(miniBitEncodeId.length, " "), () => {
			pack(value);
		})
		.add("JSON.stringify".padEnd(miniBitEncodeId.length, " "), () => {
			Buffer.from(JSON.stringify(value));
		})
		.on("cycle", (event: any) => {
			console.log(String(event.target).split(" x ").join("	"));
		})
		.run();

	const miniBitBuffer = miniBit.encode(value, schema["$id"]!);
	const msgPackBuffer = pack(value);
	const jsonBuffer = WebSafeBuffer.from(JSON.stringify(value));

	const miniBitDecodeId = `miniBit.decode.${name}`;

	new Suite("decode")
		.add(miniBitDecodeId, () => {
			decodeFn(miniBit, miniBitBuffer);
		})
		.add("msgpack.unpack".padEnd(miniBitDecodeId.length, " "), () => {
			unpack(msgPackBuffer);
		})
		.add("JSON.parse".padEnd(miniBitDecodeId.length, " "), () => {
			JSON.parse(jsonBuffer.toString());
		})
		.on("cycle", (event: any) => {
			console.log(String(event.target).split(" x ").join("	"));
		})
		.run();

	console.log("");

	console.log(`miniBit size:	${miniBitBuffer.byteLength}`);
	console.log(`msgpack size:	${msgPackBuffer.byteLength}`);
	console.log(`JSON size:   	${jsonBuffer.byteLength}`);
};
