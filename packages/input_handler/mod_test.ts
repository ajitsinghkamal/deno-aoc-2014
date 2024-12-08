import { assertEquals } from "@std/assert/equals";
import { getInput } from "./mod.ts";
import { assertThrows } from "@std/assert";

Deno.test({
	name: "Throw error when input directory not provided",
	fn: () => {
		assertThrows(() => getInput(undefined));
	},
});

Deno.test({
	name: "Throw error when path is invalid or file doesnt exist",
	fn: () => {
		assertThrows(() => getInput("./unknown.txt"));
	},
});

Deno.test({
	name: "Read input file and parse its content",
	fn: () => {
		const actual = getInput("fixtures");
		assertEquals(actual, ["test"]);
	},
});

Deno.test({
	name: "Use custom parser to parse file content when provided",
	fn: () => {
		const actual = getInput(
			"fixtures",
			{
				afterRead(input: string) {
					return input.trim();
				},
			},
		);
		assertEquals(actual, "test");
	},
});
