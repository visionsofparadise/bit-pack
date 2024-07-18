import { JSONSchema } from "json-schema-to-ts";
import { IntegerParameters } from "../integer/schema";
import { Base64Parameters } from "./contentEncoding/base64/schema";
import { HexParameters } from "./contentEncoding/hex/schema";
import { DateParameters } from "./format/date/schema";
import { DateTimeParameters } from "./format/dateTime/schema";
import { Ipv4Parameters } from "./format/ipv4/schema";
import { TimeParameters } from "./format/time/schema";
import { UuidParameters } from "./format/uuid/schema";

export const isStringJsonSchema = (schema: JSONSchema): schema is StringJsonSchema => typeof schema !== "boolean" && schema.type === "string";

export interface StringJsonSchema {
	type: "string";
	format?: "date" | "time" | "date-time" | "ipv4" | "uuid";
	minLength?: number;
	maxLength?: number;
	contentEncoding?: "base16" | "base32" | "base64";
}

export interface StringParameters {
	type: "string";
	lengthParameters: IntegerParameters;
	length?: number;
}

export type StringTypeParameters = Base64Parameters | HexParameters | DateParameters | DateTimeParameters | Ipv4Parameters | TimeParameters | UuidParameters;
