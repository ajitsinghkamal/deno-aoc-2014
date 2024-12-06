import { assertEquals } from "@std/assert";
import { getInput } from "./input-handler.ts";

Deno.test(function getInputTest() {
  assertEquals(add(2, 3), 5);
});
