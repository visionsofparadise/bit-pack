import { Binary } from "../../Binary";
import { encodeInteger } from "../integer/encode";
import { DateJsonSchema, DAY_JSON_SCHEMA, MONTH_JSON_SCHEMA, YEAR_JSON_SCHEMA } from "./schema";

export const encodeDate = (date: string, binary: Binary, _: DateJsonSchema): void => {
	const [year, month, day] = date.split("-").map((part) => parseInt(part));

	encodeInteger(year, binary, YEAR_JSON_SCHEMA);
	encodeInteger(month, binary, MONTH_JSON_SCHEMA);
	encodeInteger(day, binary, DAY_JSON_SCHEMA);
};
