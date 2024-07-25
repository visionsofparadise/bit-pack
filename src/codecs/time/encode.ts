import { Binary } from "../../Binary";
import { encodeEnum } from "../enum/encode";
import { encodeInteger } from "../integer/encode";
import { HOUR_JSON_SCHEMA, MINUTE_JSON_SCHEMA, SECOND_JSON_SCHEMA, TIME_ZONE_HOUR_JSON_SCHEMA, TIME_ZONE_SIGN_JSON_SCHEMA, TimeJsonSchema } from "./schema";

export const encodeTime = (time: string, binary: Binary, _: TimeJsonSchema): void => {
	const timeZoneSign = time.at(8);

	if (!timeZoneSign) throw new Error("Invalid time zone sign");

	const [localTime, timeZone] = time.split(timeZoneSign);

	const [hour, minute, second] = localTime.split(":").map((part) => parseInt(part));

	encodeInteger(hour, binary, HOUR_JSON_SCHEMA);
	encodeInteger(minute, binary, MINUTE_JSON_SCHEMA);
	encodeInteger(second, binary, SECOND_JSON_SCHEMA);

	encodeEnum(timeZoneSign, binary, TIME_ZONE_SIGN_JSON_SCHEMA);

	const [timeZoneHour, timeZoneMinute] = timeZone.split(":").map((part) => parseInt(part));

	encodeInteger(timeZoneHour, binary, TIME_ZONE_HOUR_JSON_SCHEMA);
	encodeInteger(timeZoneMinute, binary, MINUTE_JSON_SCHEMA);
};
