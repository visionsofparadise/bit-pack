import { Binary } from "../../../../Binary";
import { decodeEnum } from "../../../enum/decode";
import { decodeInteger } from "../../../integer/decode";
import { HOUR_PARAMETERS, MINUTE_PARAMETERS, SECOND_PARAMETERS, TIME_ZONE_HOUR_PARAMETERS, TIME_ZONE_SIGN_PARAMETERS, TimeParameters } from "./schema";

export const decodeTime = (binary: Binary, _: TimeParameters): string => {
	const hour = decodeInteger(binary, HOUR_PARAMETERS);
	const minute = decodeInteger(binary, MINUTE_PARAMETERS);
	const second = decodeInteger(binary, SECOND_PARAMETERS);

	const localTime = [hour.toString().padStart(2, "0"), minute.toString().padStart(2, "0"), second.toString().padStart(2, "0")].join(":");

	const timeZoneSign = decodeEnum(binary, TIME_ZONE_SIGN_PARAMETERS);
	const timeZoneHour = decodeInteger(binary, TIME_ZONE_HOUR_PARAMETERS);
	const timeZoneMinute = decodeInteger(binary, MINUTE_PARAMETERS);

	const timeZone = [timeZoneHour.toString().padStart(2, "0"), timeZoneMinute.toString().padStart(2, "0")].join(":");

	return [localTime, timeZone].join(timeZoneSign as string);
};
