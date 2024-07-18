import { Binary } from "../../../../Binary";
import { decodeTime } from "./decode";
import { encodeTime } from "./encode";
import { TimeParameters } from "./schema";

it("encodes and decodes time", () => {
	const time = "12:32:27+01:00";

	const parameters: TimeParameters = {
		type: "time",
	};

	const binary = new Binary();

	encodeTime(time, binary, parameters);

	const result = decodeTime(binary, parameters);

	expect(result).toBe(time);
	expect(binary.readBitIndex).toBe(28);
});
