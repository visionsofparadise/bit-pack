export const zeroLeftBits = (integer: number, bits: number) => integer & (Math.pow(2, bits) - 1);
export const zeroRightBits = (integer: number, bits: number) => integer & (4294967295 - (Math.pow(2, bits) - 1));
