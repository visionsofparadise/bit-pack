import { EnumParameters } from "../../../enum/schema";
import { IntegerParameters } from "../../../integer/schema";

export interface TimeParameters {
	type: "time";
}

export const HOUR_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 5,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};

export const MINUTE_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 6,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};

export const SECOND_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 6,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};

const TIME_ZONE_SIGN_VALUES = ["+", "-"];

export const TIME_ZONE_SIGN_PARAMETERS: EnumParameters = {
	type: "enum",
	values: TIME_ZONE_SIGN_VALUES,
	valueMap: new Map(TIME_ZONE_SIGN_VALUES.map((value, index) => [value, index])),
	lengthParameters: {
		type: "integer",
		bitLength: 1,
		byteLength: 1,
		minimum: 0,
		multipleOf: 1,
	},
};

export const TIME_ZONE_HOUR_PARAMETERS: IntegerParameters = {
	type: "integer",
	bitLength: 4,
	byteLength: 1,
	minimum: 0,
	multipleOf: 1,
};
