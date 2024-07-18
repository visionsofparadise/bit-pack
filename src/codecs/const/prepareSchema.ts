import { ConstJsonSchema, ConstParameters } from "./schema";

export const prepareConstSchema = (schema: ConstJsonSchema): ConstParameters => ({
	type: "const",
	value: schema.const,
});
