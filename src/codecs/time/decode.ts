import { Binary } from "../../Binary";
import { decodeEnum } from "../enum/decode";
import { decodeInteger } from "../integer/decode";
import { HOUR_JSON_SCHEMA, MINUTE_JSON_SCHEMA, SECOND_JSON_SCHEMA, TIME_ZONE_HOUR_JSON_SCHEMA, TIME_ZONE_SIGN_JSON_SCHEMA, TimeJsonSchema } from "./schema";

export const decodeTime = (binary: Binary, _: TimeJsonSchema): string => {
	const hour = decodeInteger(binary, HOUR_JSON_SCHEMA);
	const minute = decodeInteger(binary, MINUTE_JSON_SCHEMA);
	const second = decodeInteger(binary, SECOND_JSON_SCHEMA);

	const localTime = [hour.toString().padStart(2, "0"), minute.toString().padStart(2, "0"), second.toString().padStart(2, "0")].join(":");

	const timeZoneSign = decodeEnum(binary, TIME_ZONE_SIGN_JSON_SCHEMA);
	const timeZoneHour = decodeInteger(binary, TIME_ZONE_HOUR_JSON_SCHEMA);
	const timeZoneMinute = decodeInteger(binary, MINUTE_JSON_SCHEMA);

	const timeZone = [timeZoneHour.toString().padStart(2, "0"), timeZoneMinute.toString().padStart(2, "0")].join(":");

	return [localTime, timeZone].join(timeZoneSign as string);
};
