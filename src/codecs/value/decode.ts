import { Binary } from "../../Binary";
import { decodeAny } from "../any/decode";
import { decodeArray } from "../array/decode";
import { decodeBoolean } from "../boolean/decode";
import { decodeConst } from "../const/decode";
import { decodeEnum } from "../enum/decode";
import { decodeInteger } from "../integer/decode";
import { decodeNull } from "../null/decode";
import { decodeNumber } from "../number/decode";
import { decodeObject } from "../object/decode";
import { decodeBase64 } from "../string/contentEncoding/base64/decode";
import { decodeHex } from "../string/contentEncoding/hex/decode";
import { decodeString } from "../string/decode";
import { decodeDate } from "../string/format/date/decode";
import { decodeDateTime } from "../string/format/dateTime/decode";
import { decodeIpv4 } from "../string/format/ipv4/decode";
import { decodeTime } from "../string/format/time/decode";
import { decodeUuid } from "../string/format/uuid/decode";
import { decodeUnion } from "../union/decode";
import { ValueParameters } from "./schema";

const DECODER_MAP: Record<ValueParameters["type"], (binary: Binary, parameters: any) => any> = {
	any: decodeAny,
	array: decodeArray,
	base64: decodeBase64,
	boolean: decodeBoolean,
	const: decodeConst,
	date: decodeDate,
	dateTime: decodeDateTime,
	enum: decodeEnum,
	hex: decodeHex,
	integer: decodeInteger,
	ipv4: decodeIpv4,
	null: decodeNull,
	number: decodeNumber,
	object: decodeObject,
	string: decodeString,
	time: decodeTime,
	union: decodeUnion,
	uuid: decodeUuid,
};

export const decodeValue = (binary: Binary, parameters: ValueParameters) => DECODER_MAP[parameters.type](binary, parameters);
