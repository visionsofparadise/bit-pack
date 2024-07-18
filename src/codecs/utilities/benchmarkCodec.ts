import { Suite } from "benchmark";
import { pack, unpack } from "msgpackr";
import { Binary } from "../../Binary";
import { WebSafeBuffer } from "./SafeBuffer";
const console = require("console");

global.console = console;

export const benchmarkCodec = (name: string, value: any, encodeFn: (binary: Binary) => any, decodeFn: (binary: Binary) => any) => {
	const binary = new Binary();

	const bitPackEncodeId = `bitPack.${name}.encode`;

	new Suite("encode")
		.add(bitPackEncodeId, () => {
			encodeFn(binary);

			binary.toBuffer();

			binary.resetWrite();
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

	console.log("");

	encodeFn(binary);

	const bitPackBuffer = binary.toBuffer();
	const msgPackBuffer = pack(value);
	const jsonBuffer = WebSafeBuffer.from(JSON.stringify(value));

	const bitPackDecodeId = `bitPack.${name}.decode`;

	new Suite("decode")
		.add(bitPackDecodeId, () => {
			decodeFn(binary);

			binary.resetRead();
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
