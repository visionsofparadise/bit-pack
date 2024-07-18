import { Binary } from "../../../../Binary";
import { decodeInteger } from "../../../integer/decode";
import { DateParameters, DAY_PARAMETERS, MONTH_PARAMETERS, YEAR_PARAMETERS } from "./schema";

export const decodeDate = (binary: Binary, _: DateParameters): string => {
	const year = decodeInteger(binary, YEAR_PARAMETERS);
	const month = decodeInteger(binary, MONTH_PARAMETERS);
	const day = decodeInteger(binary, DAY_PARAMETERS);

	return [year.toString().padStart(4, "0"), month.toString().padStart(2, "0"), day.toString().padStart(2, "0")].join("-");
};
