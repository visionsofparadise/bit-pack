import { AnyParameters } from "../any/schema";
import { ArrayParameters } from "../array/schema";
import { BooleanParameters } from "../boolean/schema";
import { ConstParameters } from "../const/schema";
import { EnumParameters } from "../enum/schema";
import { IntegerParameters } from "../integer/schema";
import { NullParameters } from "../null/schema";
import { NumberParameters } from "../number/schema";
import { ObjectParameters } from "../object/schema";
import { Base64Parameters } from "../string/contentEncoding/base64/schema";
import { HexParameters } from "../string/contentEncoding/hex/schema";
import { DateParameters } from "../string/format/date/schema";
import { DateTimeParameters } from "../string/format/dateTime/schema";
import { Ipv4Parameters } from "../string/format/ipv4/schema";
import { TimeParameters } from "../string/format/time/schema";
import { UuidParameters } from "../string/format/uuid/schema";
import { StringParameters } from "../string/schema";
import { UnionParameters } from "../union/schema";

export type ValueParameters =
	| AnyParameters
	| ArrayParameters
	| Base64Parameters
	| BooleanParameters
	| ConstParameters
	| DateParameters
	| DateTimeParameters
	| EnumParameters
	| HexParameters
	| IntegerParameters
	| Ipv4Parameters
	| NullParameters
	| NumberParameters
	| ObjectParameters
	| StringParameters
	| TimeParameters
	| UnionParameters
	| UuidParameters;
