import { Binary } from "../../Binary";
import { decodeDate } from "./decode";
import { encodeDate } from "./encode";
import { DateJsonSchema } from "./schema";

it("encodes and decodes date", () => {
	const date = new Date().toISOString().split("T")[0];

	const schema: DateJsonSchema = {
		type: "string",
		format: "date",
	};

	const binary = new Binary();

	encodeDate(date, binary, schema);

	const result = decodeDate(binary, schema);

	expect(result).toBe(date);
	expect(binary.readBitIndex).toBe(21);
});
