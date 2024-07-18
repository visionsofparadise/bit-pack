import { Binary } from "../../../../Binary";
import { encodeInteger } from "../../../integer/encode";
import { DateParameters, DAY_PARAMETERS, MONTH_PARAMETERS, YEAR_PARAMETERS } from "./schema";

export const encodeDate = (date: string, binary: Binary, _: DateParameters): void => {
	const [year, month, day] = date.split("-").map((part) => parseInt(part));

	encodeInteger(year, binary, YEAR_PARAMETERS);
	encodeInteger(month, binary, MONTH_PARAMETERS);
	encodeInteger(day, binary, DAY_PARAMETERS);
};
