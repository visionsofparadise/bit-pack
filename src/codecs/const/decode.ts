import { Binary } from "../../Binary";
import { ConstParameters } from "./schema";

export const decodeConst = (_: Binary, parameters: ConstParameters): string | number | boolean => parameters.value;
