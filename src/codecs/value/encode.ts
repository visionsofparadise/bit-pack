import { Binary } from "../../Binary";
import { encodeAny } from "../any/encode";
import { encodeArray } from "../array/encode";
import { encodeBase64 } from "../base64/encode";
import { encodeBoolean } from "../boolean/encode";
import { encodeConst } from "../const/encode";
import { encodeDate } from "../date/encode";
import { encodeDateTime } from "../dateTime/encode";
import { encodeEnum } from "../enum/encode";
import { encodeHex } from "../hex/encode";
import { encodeInteger } from "../integer/encode";
import { encodeIpv4 } from "../ipv4/encode";
import { encodeNull } from "../null/encode";
import { encodeNumber } from "../number/encode";
import { encodeObject } from "../object/encode";
import { encodeString } from "../string/encode";
import { encodeTime } from "../time/encode";
import { encodeUnion } from "../union/encode";
import { encodeUuid } from "../uuid/encode";
import { ValueJsonSchema } from "./schema";

export const encodeValue = (value: any, binary: Binary, schema: ValueJsonSchema): void => {
	if (typeof schema === "boolean") {
		if (schema === true) return encodeAny(value, binary, schema);

		throw new Error("Invalid json schema");
	}

	if ("const" in schema) return encodeConst(value, binary, schema);
	if ("enum" in schema) return encodeEnum(value, binary, schema);
	if ("type" in schema) {
		if (Array.isArray(schema.type)) return encodeUnion(value, binary, schema);

		switch (schema.type) {
			case "array":
				return encodeArray(value, binary, schema);
			case "boolean":
				return encodeBoolean(value, binary, schema);
			case "integer":
				return encodeInteger(value, binary, schema);
			case "null":
				return encodeNull(value, binary, schema);
			case "number":
				return encodeNumber(value, binary, schema);
			case "object":
				return encodeObject(value, binary, schema);
			case "string":
				if ("contentEncoding" in schema) {
					switch (schema.contentEncoding) {
						case "base16":
							return encodeHex(value, binary, schema);
						case "base64":
							return encodeBase64(value, binary, schema);
					}
				}

				if ("format" in schema) {
					switch (schema.format) {
						case "date":
							return encodeDate(value, binary, schema);
						case "date-time":
							return encodeDateTime(value, binary, schema);

						case "ipv4":
							return encodeIpv4(value, binary, schema);
						case "time":
							return encodeTime(value, binary, schema);
						case "uuid":
							return encodeUuid(value, binary, schema);
					}
				}

				return encodeString(value, binary, schema);
		}
	}

	return encodeAny(value, binary, schema);
};
