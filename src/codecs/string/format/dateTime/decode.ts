import { Binary } from "../../../../Binary";
import { decodeDate } from "../date/decode";
import { decodeTime } from "../time/decode";
import { DATE_PARAMETERS, DateTimeParameters, TIME_PARAMETERS } from "./schema";

export const decodeDateTime = (binary: Binary, _: DateTimeParameters): string => {
	const date = decodeDate(binary, DATE_PARAMETERS);
	const time = decodeTime(binary, TIME_PARAMETERS);

	return [date, time].join("T");
};
