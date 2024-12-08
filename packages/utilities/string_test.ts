import { splitInListByNewLine, splitInListByWhitespace } from "./string.ts";
import { assertEquals } from "@std/assert";

Deno.test("splitInListByWhitespace > should return list by splitting on whitespaces in string", () => {
	assertEquals(splitInListByWhitespace("one   two three"), [
		"one",
		"two",
		"three",
	]);
});

Deno.test("splitInListByNewLine > should return list split on newline characters", () => {
	const mock = `one\ntwo\nthree`;

	assertEquals(splitInListByNewLine(mock), [
		"one",
		"two",
		"three",
	]);
});
