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
		Deno.env.set("DEFAULT_INPUT_FILE_NAME", "mock_input.txt");

		const actual = getInput(import.meta.dirname);
		assertEquals(actual, ["test"]);
	},
});

Deno.test({
	name: "Use custom parser to parse file content when provided",
	fn: () => {
		const actual = getInput(import.meta.dirname, {
			afterRead(input: string) {
				return input.trim();
			},
		});
		assertEquals(actual, "test");
	},
});
