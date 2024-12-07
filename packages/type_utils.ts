export type Maybe<T> = T | undefined;

export function isTypeString(
	value: unknown,
): value is string {
	return typeof value === "string";
}
