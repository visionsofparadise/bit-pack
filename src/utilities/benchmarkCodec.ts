import { Suite } from "benchmark";
import { pack, unpack } from "msgpackr";
import { Binary } from "../Binary";
import { WebSafeBuffer } from "./SafeBuffer";
const console = require("console");

global.console = console;

export const benchmarkCodec = (name: string, value: any, encodeFn: (binary: Binary) => any, decodeFn: (binary: Binary) => any) => {
	const binary = new Binary();

	const miniBitEncodeId = `miniBit.${name}.encode`;

	new Suite("encode")
		.add(miniBitEncodeId, () => {
			encodeFn(binary);

			binary.toBuffer();

			binary.resetWrite();
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

	console.log("");

	encodeFn(binary);

	const miniBitBuffer = binary.toBuffer();
	const msgPackBuffer = pack(value);
	const jsonBuffer = WebSafeBuffer.from(JSON.stringify(value));

	const miniBitDecodeId = `miniBit.${name}.decode`;

	new Suite("decode")
		.add(miniBitDecodeId, () => {
			decodeFn(binary);

			binary.resetRead();
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
