import { Binary } from "../../../../Binary";
import { decodeIpv4 } from "./decode";
import { encodeIpv4 } from "./encode";
import { Ipv4Parameters } from "./schema";

it("encodes and decodes ipv4", () => {
	const ipv4 = "255.255.255.255";

	const parameters: Ipv4Parameters = {
		type: "ipv4",
	};

	const binary = new Binary();

	encodeIpv4(ipv4, binary, parameters);

	const result = decodeIpv4(binary, parameters);

	expect(result).toBe(ipv4);
	expect(binary.readBitIndex).toBe(32);
});
