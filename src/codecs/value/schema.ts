import { AnyJsonSchema } from "../any/schema";
import { ArrayJsonSchema } from "../array/schema";
import { Base64JsonSchema } from "../base64/schema";
import { BooleanJsonSchema } from "../boolean/schema";
import { ConstJsonSchema } from "../const/schema";
import { DateJsonSchema } from "../date/schema";
import { DateTimeJsonSchema } from "../dateTime/schema";
import { EnumJsonSchema } from "../enum/schema";
import { HexJsonSchema } from "../hex/schema";
import { IntegerJsonSchema } from "../integer/schema";
import { Ipv4JsonSchema } from "../ipv4/schema";
import { NullJsonSchema } from "../null/schema";
import { NumberJsonSchema } from "../number/schema";
import { ObjectJsonSchema } from "../object/schema";
import { StringJsonSchema } from "../string/schema";
import { TimeJsonSchema } from "../time/schema";
import { UnionJsonSchema } from "../union/schema";
import { UuidJsonSchema } from "../uuid/schema";

export type ValueJsonSchema =
	| AnyJsonSchema
	| ArrayJsonSchema
	| Base64JsonSchema
	| BooleanJsonSchema
	| ConstJsonSchema
	| DateJsonSchema
	| DateTimeJsonSchema
	| EnumJsonSchema
	| HexJsonSchema
	| IntegerJsonSchema
	| Ipv4JsonSchema
	| NullJsonSchema
	| NumberJsonSchema
	| ObjectJsonSchema
	| StringJsonSchema
	| TimeJsonSchema
	| UnionJsonSchema
	| UuidJsonSchema;
