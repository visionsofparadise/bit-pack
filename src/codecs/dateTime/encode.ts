import { Binary } from "../../Binary";
import { encodeDate } from "../date/encode";
import { encodeTime } from "../time/encode";
import { DATE_JSON_SCHEMA, DateTimeJsonSchema, TIME_JSON_SCHEMA } from "./schema";

export const encodeDateTime = (dateTime: string, binary: Binary, _: DateTimeJsonSchema): void => {
	const [date, time] = dateTime.split("T");

	encodeDate(date, binary, DATE_JSON_SCHEMA);
	encodeTime(time, binary, TIME_JSON_SCHEMA);
};
