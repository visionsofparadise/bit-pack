import { Binary } from "../../../../Binary";
import { decodeUuid } from "./decode";
import { encodeUuid } from "./encode";
import { UuidParameters } from "./schema";

it("encodes and decodes uuid", () => {
	const uuid = "3e4666bf-d5e5-4aa7-b8ce-cefe41c7568a";

	const parameters: UuidParameters = {
		type: "uuid",
	};

	const binary = new Binary();

	encodeUuid(uuid, binary, parameters);

	const result = decodeUuid(binary, parameters);

	expect(result).toBe(uuid);
	expect(binary.readBitIndex).toBe(128);
});
