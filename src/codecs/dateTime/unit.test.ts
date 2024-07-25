import { Binary } from "../../Binary";
import { decodeDateTime } from "./decode";
import { encodeDateTime } from "./encode";
import { DateTimeJsonSchema } from "./schema";

it("encodes and decodes datetime", () => {
	const datetime = new Date().toISOString().split("T")[0] + "T12:32:27+01:00";

	const schema: DateTimeJsonSchema = {
		type: "string",
		format: "date-time",
	};

	const binary = new Binary();

	encodeDateTime(datetime, binary, schema);

	const result = decodeDateTime(binary, schema);

	expect(result).toBe(datetime);
	expect(binary.readBitIndex).toBe(49);
});
