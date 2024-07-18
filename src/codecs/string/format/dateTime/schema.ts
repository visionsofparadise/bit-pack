import { DateParameters } from "../date/schema";
import { TimeParameters } from "../time/schema";

export interface DateTimeParameters {
	type: "dateTime";
}

export const DATE_PARAMETERS: DateParameters = {
	type: "date",
};

export const TIME_PARAMETERS: TimeParameters = {
	type: "time",
};
