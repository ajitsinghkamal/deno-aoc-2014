import { getInput } from "./input-handler.ts";
import { assertThrows } from "@std/assert";

Deno.test("Throw error when input directory not provided", () => {
	assertThrows(() => getInput(undefined));
});
