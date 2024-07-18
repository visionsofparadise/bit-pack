import { Binary } from "../../../../Binary";
import { decodeDate } from "./decode";
import { encodeDate } from "./encode";
import { DateParameters } from "./schema";

it("encodes and decodes date", () => {
	const date = new Date().toISOString().split("T")[0];

	const parameters: DateParameters = {
		type: "date",
	};

	const binary = new Binary();

	encodeDate(date, binary, parameters);

	const result = decodeDate(binary, parameters);

	expect(result).toBe(date);
	expect(binary.readBitIndex).toBe(21);
});
