import { assertEquals } from "@std/assert";
import { appendFileExt, getValidFilePathOrThrow } from "./file.ts";
import { assertThrows } from "@std/assert/throws";

Deno.test("appendFileExt > should append file extension when missing", () => {
	const mockFilePath = "./path/mock_file";
	assertEquals(appendFileExt(mockFilePath), `${mockFilePath}.ts`);
	assertEquals(appendFileExt(mockFilePath, ".js"), `${mockFilePath}.js`);
});

Deno.test("appendFileExt > should return original when extension already present", () => {
	const mockFilePath = "./path/mock_file.ts";
	assertEquals(appendFileExt(mockFilePath), mockFilePath);
});

Deno.test("getValidFilePathOrThrow > should return expected file path when file exists", () => {
	const path = "fixtures/mock_input";
	assertEquals(getValidFilePathOrThrow(path, ".txt"), `${path}.txt`);
});

Deno.test("getValidFilePathOrThrow > should throw when file path do not exists", () => {
	const path = "invalid";
	assertThrows(() => getValidFilePathOrThrow(path));
});
