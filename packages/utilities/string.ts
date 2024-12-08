export function isTypeString(
	value: unknown,
): value is string {
	return typeof value === "string";
}

export function splitInListByWhitespace(input: string) {
	return input.trim().split(/\s+/);
}

export function splitInListByNewLine(input: string) {
	return input.trim().split("\n");
}
