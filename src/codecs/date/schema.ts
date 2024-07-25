import { IntegerJsonSchema } from "../integer/schema";

export interface DateJsonSchema {
	type: "string";
	format: "date";
}

export const YEAR_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 4000,
	multipleOf: 1,
};

export const MONTH_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 12,
	multipleOf: 1,
};

export const DAY_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 31,
	multipleOf: 1,
};
