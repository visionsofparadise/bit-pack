import { Binary } from "../../Binary";
import { decodeDate } from "../date/decode";
import { decodeTime } from "../time/decode";
import { DATE_JSON_SCHEMA, DateTimeJsonSchema, TIME_JSON_SCHEMA } from "./schema";

export const decodeDateTime = (binary: Binary, _: DateTimeJsonSchema): string => {
	const date = decodeDate(binary, DATE_JSON_SCHEMA);
	const time = decodeTime(binary, TIME_JSON_SCHEMA);

	return [date, time].join("T");
};
