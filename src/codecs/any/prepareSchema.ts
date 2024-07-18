import { AnyJsonSchema, AnyParameters } from "./schema";

export const prepareAnySchema = (_: AnyJsonSchema): AnyParameters => ({
	type: "any",
});
