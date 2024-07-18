export const isNotNullOrUndefined = <V>(value: V): value is NonNullable<V> => value !== undefined && value !== null;
