import { Binary } from "../../../../Binary";
import { encodeEnum } from "../../../enum/encode";
import { encodeInteger } from "../../../integer/encode";
import { HOUR_PARAMETERS, MINUTE_PARAMETERS, SECOND_PARAMETERS, TIME_ZONE_HOUR_PARAMETERS, TIME_ZONE_SIGN_PARAMETERS, TimeParameters } from "./schema";

export const encodeTime = (time: string, binary: Binary, _: TimeParameters): void => {
	const timeZoneSign = time.at(8);

	if (!timeZoneSign) throw new Error("Invalid time zone sign");

	const [localTime, timeZone] = time.split(timeZoneSign);

	const [hour, minute, second] = localTime.split(":").map((part) => parseInt(part));

	encodeInteger(hour, binary, HOUR_PARAMETERS);
	encodeInteger(minute, binary, MINUTE_PARAMETERS);
	encodeInteger(second, binary, SECOND_PARAMETERS);

	encodeEnum(timeZoneSign, binary, TIME_ZONE_SIGN_PARAMETERS);

	const [timeZoneHour, timeZoneMinute] = timeZone.split(":").map((part) => parseInt(part));

	encodeInteger(timeZoneHour, binary, TIME_ZONE_HOUR_PARAMETERS);
	encodeInteger(timeZoneMinute, binary, MINUTE_PARAMETERS);
};
