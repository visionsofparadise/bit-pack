export const MAX_INTEGER = 4294967295;

export const calculateIntegerBitLength = (value: number) => 32 - Math.clz32(value) || 1;
