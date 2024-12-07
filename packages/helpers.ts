import { existsSync } from "@std/fs";
import { isTypeString, type Maybe } from "./type_utils.ts";

export function appendFileExt(
	path: Maybe<string>,
	ext: ".ts" | ".js" = ".ts",
): Maybe<string> {
	return path && !path.endsWith(ext) ? `${path}.ts` : path;
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
