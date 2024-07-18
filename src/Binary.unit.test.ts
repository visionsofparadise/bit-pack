import { Binary } from "./Binary";

const binary = new Binary();

it("writes unshifted bytes", () => {
	binary.reset();

	const source = Buffer.from([1, 1, 1]);

	binary.write(source, 0, 3);

	const result = binary.buffer.subarray(0, 3);

	expect(Buffer.compare(source, result)).toBe(0);
});

it("writes left shifted bytes", () => {
	binary.reset();

	const source = Buffer.from([1, 1, 1]);

	binary.write(source, 1, 3);

	const result = binary.buffer.subarray(0, 3);

	expect(result[0]).toBe(2);
	expect(result[1]).toBe(2);
	expect(result[2]).toBeGreaterThan(1);
	expect(result[2]).toBeLessThan(4);
});

it("writes right shifted bytes", () => {
	binary.reset();

	const sourceA = Buffer.from([0]);

	binary.write(sourceA, 0, 8);

	binary.writeBitIndex = 1;

	const sourceB = Buffer.from([2, 2, 2]);

	binary.write(sourceB, 0, 3);

	const result = binary.buffer.subarray(0, 3);

	const expected = Buffer.from([1, 1, 1]);

	expect(Buffer.compare(expected, result)).toBe(0);
});

it("writes bits to byte", () => {
	binary.reset();

	for (let i = 0; i < 8; i++) {
		const source = Buffer.from([1]);

		binary.write(source, 7, 1);
	}

	expect(binary.buffer[0]).toBe(255);
});

it("reads unshifted bytes", () => {
	binary.reset();

	const source = Buffer.from([1, 1, 1]);

	binary.write(source, 0, 3);

	const result = binary.read(0, 3);

	expect(Buffer.compare(source, result)).toBe(0);
});

it("reads left shifted bytes", () => {
	binary.reset();

	const source = Buffer.from([1, 1, 1]);

	binary.write(source, 0, 3);

	binary.readBitIndex = 1;

	const result = binary.read(0, 3);

	expect(result[0]).toBe(2);
	expect(result[1]).toBe(2);
	expect(result[2]).toBeGreaterThan(1);
	expect(result[2]).toBeLessThan(4);
});

it("reads right shifted bytes", () => {
	binary.reset();

	const source = Buffer.from([2, 2, 2]);

	binary.write(source, 0, 3);

	const result = binary.read(1, 3);

	const expected = Buffer.from([1, 1, 1]);

	expect(Buffer.compare(expected, result)).toBe(0);
});

it("reads bits from byte", () => {
	binary.reset();

	for (let i = 0; i < 8; i++) {
		const source = Buffer.from([1]);

		binary.write(source, 7, 1);
	}

	for (let i = 0; i < 8; i++) {
		const result = binary.read(7, 1);

		expect(result[0]).toBe(1);
	}
});

it("writes and reads an integer", () => {
	binary.reset();

	const integer = 27;

	binary.writeBuffer.writeUInt8(integer);

	binary.write(binary.writeBuffer, 1, 1);

	const result = binary.read(1, 1);

	const resultInteger = result.readUInt8();

	expect(resultInteger).toBe(integer);
});

it("writes and reads a series of integers", () => {
	binary.reset();

	const integerA = 12;

	binary.writeBuffer.writeUInt8(integerA);

	binary.write(binary.writeBuffer, 3, 1);

	const integerB = 32;

	binary.writeBuffer.writeUInt8(integerB);

	binary.write(binary.writeBuffer, 2, 1);

	const integerC = 27;

	binary.writeBuffer.writeUInt8(integerC);

	binary.write(binary.writeBuffer, 2, 1);

	const resultA = binary.read(3, 1);

	const resultIntegerA = resultA.readUInt8();

	expect(resultIntegerA).toBe(integerA);

	const resultB = binary.read(2, 1);

	const resultIntegerB = resultB.readUInt8();

	expect(resultIntegerB).toBe(integerB);

	const resultC = binary.read(2, 1);

	const resultIntegerC = resultC.readUInt8();

	expect(resultIntegerC).toBe(integerC);
});

it("writes and reads a series of integers and strings", () => {
	binary.reset();

	const integerA = 27;

	binary.writeBuffer.writeUInt8(integerA);

	binary.write(binary.writeBuffer, 1, 1);

	const stringB = "test";

	const stringBByteLength = binary.writeBuffer.write(stringB, 0, "utf8");

	binary.write(binary.writeBuffer, 0, stringBByteLength);

	const resultA = binary.read(1, 1);

	const resultIntegerA = resultA.readUInt8();

	expect(resultIntegerA).toBe(integerA);

	const resultB = binary.read(0, stringBByteLength);

	expect(resultB.toString("utf8")).toBe(stringB);
});
