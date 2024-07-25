import { Binary } from "../../Binary";
import { Ipv4JsonSchema } from "./schema";

export const decodeIpv4 = (binary: Binary, _: Ipv4JsonSchema): string => {
	return [...binary.read(0, 4).values()].join(".");
};
