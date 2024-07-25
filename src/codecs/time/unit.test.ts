import { Binary } from "../../Binary";
import { decodeTime } from "./decode";
import { encodeTime } from "./encode";
import { TimeJsonSchema } from "./schema";

it("encodes and decodes time", () => {
	const time = "12:32:27+01:00";

	const schema: TimeJsonSchema = {
		type: "string",
		format: "time",
	};

	const binary = new Binary();

	encodeTime(time, binary, schema);

	const result = decodeTime(binary, schema);

	expect(result).toBe(time);
	expect(binary.readBitIndex).toBe(28);
});
