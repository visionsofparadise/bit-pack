import { IntegerParameters } from "../../../integer/schema";

export interface DateParameters {
	type: "date";
}

export const YEAR_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 12,
	byteLength: 2,
	minimum: 0,
	multipleOf: 1,
};

export const MONTH_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 4,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};

export const DAY_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 5,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};
