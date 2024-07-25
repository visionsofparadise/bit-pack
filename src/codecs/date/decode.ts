import { Binary } from "../../Binary";
import { decodeInteger } from "../integer/decode";
import { DateJsonSchema, DAY_JSON_SCHEMA, MONTH_JSON_SCHEMA, YEAR_JSON_SCHEMA } from "./schema";

export const decodeDate = (binary: Binary, _: DateJsonSchema): string => {
	const year = decodeInteger(binary, YEAR_JSON_SCHEMA);
	const month = decodeInteger(binary, MONTH_JSON_SCHEMA);
	const day = decodeInteger(binary, DAY_JSON_SCHEMA);

	return [year.toString().padStart(4, "0"), month.toString().padStart(2, "0"), day.toString().padStart(2, "0")].join("-");
};
