import { Binary } from "../../Binary";
import { decodeAny } from "../any/decode";
import { decodeArray } from "../array/decode";
import { decodeBase64 } from "../base64/decode";
import { decodeBoolean } from "../boolean/decode";
import { decodeConst } from "../const/decode";
import { decodeDate } from "../date/decode";
import { decodeDateTime } from "../dateTime/decode";
import { decodeEnum } from "../enum/decode";
import { decodeHex } from "../hex/decode";
import { decodeInteger } from "../integer/decode";
import { decodeIpv4 } from "../ipv4/decode";
import { decodeNull } from "../null/decode";
import { decodeNumber } from "../number/decode";
import { decodeObject } from "../object/decode";
import { decodeString } from "../string/decode";
import { decodeTime } from "../time/decode";
import { decodeUnion } from "../union/decode";
import { decodeUuid } from "../uuid/decode";
import { ValueJsonSchema } from "./schema";

export const decodeValue = (binary: Binary, schema: ValueJsonSchema) => {
	if (typeof schema === "boolean") {
		if (schema === true) return decodeAny(binary, schema);

		throw new Error("Invalid json schema");
	}

	if ("const" in schema) return decodeConst(binary, schema);
	if ("enum" in schema) return decodeEnum(binary, schema);
	if ("type" in schema) {
		if (Array.isArray(schema.type)) return decodeUnion(binary, schema);

		switch (schema.type) {
			case "array":
				return decodeArray(binary, schema);
			case "boolean":
				return decodeBoolean(binary, schema);
			case "integer":
				return decodeInteger(binary, schema);
			case "null":
				return decodeNull(binary, schema);
			case "number":
				return decodeNumber(binary, schema);
			case "object":
				return decodeObject(binary, schema);
			case "string":
				if ("contentEncoding" in schema) {
					switch (schema.contentEncoding) {
						case "base16":
							return decodeHex(binary, schema);
						case "base64":
							return decodeBase64(binary, schema);
					}
				}

				if ("format" in schema) {
					switch (schema.format) {
						case "date":
							return decodeDate(binary, schema);
						case "date-time":
							return decodeDateTime(binary, schema);

						case "ipv4":
							return decodeIpv4(binary, schema);
						case "time":
							return decodeTime(binary, schema);
						case "uuid":
							return decodeUuid(binary, schema);
					}
				}

				return decodeString(binary, schema);
		}
	}

	return decodeAny(binary, schema);
};
