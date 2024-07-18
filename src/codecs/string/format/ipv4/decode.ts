import { Binary } from "../../../../Binary";
import { Ipv4Parameters } from "./schema";

export const decodeIpv4 = (binary: Binary, _: Ipv4Parameters): string => {
	return [...binary.read(0, 4).values()].join(".");
};
