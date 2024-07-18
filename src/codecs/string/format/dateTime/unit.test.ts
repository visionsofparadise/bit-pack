import { Binary } from "../../../../Binary";
import { decodeDateTime } from "./decode";
import { encodeDateTime } from "./encode";
import { DateTimeParameters } from "./schema";

it("encodes and decodes datetime", () => {
	const datetime = new Date().toISOString().split("T")[0] + "T12:32:27+01:00";

	const parameters: DateTimeParameters = {
		type: "dateTime",
	};

	const binary = new Binary();

	encodeDateTime(datetime, binary, parameters);

	const result = decodeDateTime(binary, parameters);

	expect(result).toBe(datetime);
	expect(binary.readBitIndex).toBe(49);
});
