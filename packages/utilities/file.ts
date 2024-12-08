import { existsSync } from "@std/fs";
import { type Maybe, type SupportedFileExtensions } from "../../types.ts";
import { isTypeString } from "./string.ts";

export function appendFileExt(
	path: Maybe<string>,
	ext: SupportedFileExtensions = ".ts",
): Maybe<string> {
	return path && !path.endsWith(ext) ? `${path}${ext}` : path;
}

export function getValidFilePathOrThrow(
	input: Maybe<string | { path: Maybe<string>; exceptionMsg?: string }>,
): string {
	const path = isTypeString(input) ? input : input?.path;
	const exception = isTypeString(input) ? null : input?.exceptionMsg;

	const pathWithExt = appendFileExt(path);

	if (pathWithExt && existsSync(pathWithExt)) {
		return pathWithExt;
	}
	throw Error(exception ?? "Invalid file path");
}
