import { DateJsonSchema } from "../date/schema";
import { TimeJsonSchema } from "../time/schema";

export interface DateTimeJsonSchema {
	type: "string";
	format: "date-time";
}

export const DATE_JSON_SCHEMA: DateJsonSchema = {
	type: "string",
	format: "date",
};

export const TIME_JSON_SCHEMA: TimeJsonSchema = {
	type: "string",
	format: "time",
};
