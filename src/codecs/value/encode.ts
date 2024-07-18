import { Binary } from "../../Binary";
import { encodeAny } from "../any/encode";
import { encodeArray } from "../array/encode";
import { encodeBoolean } from "../boolean/encode";
import { encodeConst } from "../const/encode";
import { encodeEnum } from "../enum/encode";
import { encodeInteger } from "../integer/encode";
import { encodeNull } from "../null/encode";
import { encodeNumber } from "../number/encode";
import { encodeObject } from "../object/encode";
import { encodeBase64 } from "../string/contentEncoding/base64/encode";
import { encodeHex } from "../string/contentEncoding/hex/encode";
import { encodeString } from "../string/encode";
import { encodeDate } from "../string/format/date/encode";
import { encodeDateTime } from "../string/format/dateTime/encode";
import { encodeIpv4 } from "../string/format/ipv4/encode";
import { encodeTime } from "../string/format/time/encode";
import { encodeUuid } from "../string/format/uuid/encode";
import { encodeUnion } from "../union/encode";
import { ValueParameters } from "./schema";

const ENCODER_MAP: Record<ValueParameters["type"], (value: any, binary: Binary, parameters: any) => void> = {
	any: encodeAny,
	array: encodeArray,
	base64: encodeBase64,
	boolean: encodeBoolean,
	const: encodeConst,
	date: encodeDate,
	dateTime: encodeDateTime,
	enum: encodeEnum,
	hex: encodeHex,
	integer: encodeInteger,
	ipv4: encodeIpv4,
	null: encodeNull,
	number: encodeNumber,
	object: encodeObject,
	string: encodeString,
	time: encodeTime,
	union: encodeUnion,
	uuid: encodeUuid,
};

export const encodeValue = (value: any, binary: Binary, parameters: ValueParameters): void => ENCODER_MAP[parameters.type](value, binary, parameters);
