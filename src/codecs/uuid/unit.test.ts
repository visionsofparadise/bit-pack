import { Binary } from "../../Binary";
import { decodeUuid } from "./decode";
import { encodeUuid } from "./encode";
import { UuidJsonSchema } from "./schema";

it("encodes and decodes uuid", () => {
	const uuid = "3e4666bf-d5e5-4aa7-b8ce-cefe41c7568a";

	const schema: UuidJsonSchema = {
		type: "string",
		format: "uuid",
	};

	const binary = new Binary();

	encodeUuid(uuid, binary, schema);

	const result = decodeUuid(binary, schema);

	expect(result).toBe(uuid);
	expect(binary.readBitIndex).toBe(128);
});
