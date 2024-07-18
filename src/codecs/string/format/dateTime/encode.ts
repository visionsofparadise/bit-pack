import { Binary } from "../../../../Binary";
import { encodeDate } from "../date/encode";
import { encodeTime } from "../time/encode";
import { DATE_PARAMETERS, DateTimeParameters, TIME_PARAMETERS } from "./schema";

export const encodeDateTime = (dateTime: string, binary: Binary, _: DateTimeParameters): void => {
	const [date, time] = dateTime.split("T");

	encodeDate(date, binary, DATE_PARAMETERS);
	encodeTime(time, binary, TIME_PARAMETERS);
};
