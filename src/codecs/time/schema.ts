import { EnumJsonSchema } from "../enum/schema";
import { IntegerJsonSchema } from "../integer/schema";

export interface TimeJsonSchema {
	type: "string";
	format: "time";
}

export const HOUR_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 24,
	multipleOf: 1,
};

export const MINUTE_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 60,
	multipleOf: 1,
};

export const SECOND_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 60,
	multipleOf: 1,
};

export const TIME_ZONE_SIGN_JSON_SCHEMA: EnumJsonSchema = {
	enum: ["+", "-"],
};

export const TIME_ZONE_HOUR_JSON_SCHEMA: IntegerJsonSchema = {
	type: "integer",
	minimum: 0,
	maximum: 12,
	multipleOf: 1,
};
