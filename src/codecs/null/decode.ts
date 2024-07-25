import { Binary } from "../../Binary";
import { NullJsonSchema } from "./schema";

export const decodeNull = (_: Binary, __: NullJsonSchema): null => null;
