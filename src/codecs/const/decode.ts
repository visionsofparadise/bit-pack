import { Binary } from "../../Binary";
import { ConstJsonSchema } from "./schema";

export const decodeConst = (_: Binary, schema: ConstJsonSchema): string | number | boolean => schema.const;
