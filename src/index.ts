import { RefResolver } from "json-schema-ref-resolver";
import { Binary } from "./Binary";
import { WebSafeBuffer } from "./codecs/utilities/SafeBuffer";
import { decodeValue } from "./codecs/value/decode";
import { encodeValue } from "./codecs/value/encode";
import { prepareValueSchema } from "./codecs/value/prepareSchema";
import { ValueParameters } from "./codecs/value/schema";

export class MiniBit {
	public readonly parameters: Record<string, ValueParameters>;

	constructor(schemas?: Array<any>) {
		if (!schemas) {
			this.parameters = {};

			return;
		}

		const refResolver = new RefResolver();

		for (const schema of schemas) refResolver.addSchema(schema);

		const entries: Array<[string, ValueParameters]> = [];

		for (const schema of schemas) {
			if (typeof schema === "boolean") throw new Error("Invalid schema");
			if (!schema["$id"]) throw new Error("$id required in schema");

			const dereffedSchema = refResolver.getDerefSchema(schema["$id"]);

			entries.push([schema["$id"], prepareValueSchema(dereffedSchema)]);
		}

		this.parameters = Object.fromEntries(entries);
	}

	encode<V>(data: V, schemaId: string): WebSafeBuffer {
		const binary = new Binary();

		const parameters = this.parameters[schemaId];

		encodeValue(data, binary, parameters);

		return binary.toBuffer();
	}

	decode<V>(data: Uint8Array, schemaId: string): V {
		const binary = new Binary(data);

		const parameters = this.parameters[schemaId];

		return decodeValue(binary, parameters) as V;
	}
}
