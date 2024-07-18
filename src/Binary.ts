import { WebSafeBuffer } from "./codecs/utilities/SafeBuffer";
import { zeroRightBits } from "./codecs/utilities/zeroBits";

export class Binary {
	buffer: WebSafeBuffer;
	outputBuffer: WebSafeBuffer = WebSafeBuffer.allocUnsafe(8192);

	writeBitIndex: number = 0;
	readBitIndex: number = 0;

	constructor(buffer?: WebSafeBuffer | Uint8Array) {
		if (buffer) this.buffer = buffer instanceof WebSafeBuffer ? buffer : WebSafeBuffer.from(buffer);
		else this.buffer = WebSafeBuffer.allocUnsafe(8192);
	}

	get writeByteIndex() {
		return this.writeBitIndex >>> 3;
	}

	get writeByteLength() {
		return this.writeByteIndex + 1;
	}

	get writeBitOffset() {
		return this.writeBitIndex % 8;
	}

	get writeBuffer() {
		return this.buffer.subarray((this.writeBitIndex >>> 3) + 1);
	}

	get readByteIndex() {
		return this.readBitIndex >>> 3;
	}

	get readByteLength() {
		return this.readByteIndex + 1;
	}

	get readBitOffset() {
		return this.readBitIndex % 8;
	}

	reallocateBuffer = (byteLength: number) => {
		const nextLength = this.writeByteLength + byteLength + 1;

		if (nextLength > this.buffer.byteLength) {
			const newBuffer = Buffer.allocUnsafe(nextLength << 1);

			this.buffer.copy(newBuffer, 0, 0, this.writeByteLength);

			this.buffer = newBuffer;
		}
	};

	private _writeShift = (source: WebSafeBuffer, sourceOffset: number, target: WebSafeBuffer, targetOffset: number, byteLength: number): void => {
		// if buffers are aligned, write directly
		if (sourceOffset === 0 && targetOffset === 0) {
			source.copy(target, 0, 0, byteLength);

			return;
		}

		// only shift source
		if (targetOffset === 0) {
			for (let i = 0; i < byteLength; i++) {
				target[i] = 0xff & ((source[i] << sourceOffset) | ((source[i + 1] || 0) >>> (8 - sourceOffset)));
			}

			return;
		}

		target[0] = zeroRightBits(target[0], 8 - targetOffset);

		// only shift to target
		if (sourceOffset === 0) {
			for (let i = 0; i < byteLength; i++) {
				target[i] |= source[i] >>> targetOffset;
				target[i + 1] = 0xff & (source[i] << (8 - targetOffset));
			}

			return;
		}

		// shift both
		for (let i = 0; i < byteLength; i++) {
			const byte = 0xff & ((source[i] << sourceOffset) | ((source[i + 1] || 0) >>> (8 - sourceOffset)));

			target[i] |= byte >>> targetOffset;
			target[i + 1] = 0xff && byte << (8 - targetOffset);
		}
	};

	write = (source: WebSafeBuffer, bitOffset: number, byteLength: number): void => {
		const target = this.buffer.subarray(this.writeByteIndex);

		this._writeShift(source, bitOffset, target, this.writeBitOffset, byteLength);

		this.writeBitIndex += (byteLength << 3) - bitOffset;
	};

	resetWrite = (): void => {
		this.writeBitIndex = 0;
	};

	read = (bitOffset: number, byteLength: number): WebSafeBuffer => {
		const source = this.buffer.subarray(this.readByteIndex);

		if (byteLength + 1 > this.outputBuffer.byteLength) {
			const newBuffer = Buffer.allocUnsafe(byteLength + 1);

			this.outputBuffer = newBuffer;
		}

		this.outputBuffer[0] = 0;

		this._writeShift(source, this.readBitOffset, this.outputBuffer, bitOffset, byteLength);

		this.readBitIndex += (byteLength << 3) - bitOffset;

		return this.outputBuffer.subarray(0, byteLength);
	};

	resetRead = (): void => {
		this.readBitIndex = 0;
	};

	reset = (): void => {
		this.resetWrite();
		this.resetRead();
	};

	toBuffer = (): WebSafeBuffer => {
		return this.buffer.subarray(0, this.writeByteLength);
	};
}
